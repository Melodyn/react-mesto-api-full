import path from 'path';
import { constants } from 'http2';
import { fileURLToPath } from 'url';
// libs
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from 'winston';
import winstonExpress from 'express-winston';
import { errors, isCelebrateError } from 'celebrate';
// modules
import { HTTPError } from './errors/index.js';
// routes
import { router as userRouter } from './routes/users.js';
import { router as cardRouter } from './routes/cards.js';
import { router as authRouter } from './routes/auth.js';
import { auth } from './middlewares/auth.js';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const run = async (envName) => {
  process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });

  const isProduction = envName.includes('prod');
  const config = dotenv.config({
    path: path.resolve(__dirname, (isProduction ? '.env' : '.env.common')),
  }).parsed;
  if (!config) {
    throw new Error('Config not found');
  }
  config.NODE_ENV = envName;
  config.IS_PROD = isProduction;

  const requestLogger = winstonExpress.logger({
    transports: [
      new winston.transports.File({
        filename: path.resolve(__dirname, 'request.log'),
      }),
    ],
    format: winston.format.json(),
  });
  const errorLogger = winstonExpress.errorLogger({
    transports: [
      new winston.transports.File({
        filename: path.resolve(__dirname, 'error.log'),
      }),
    ],
    format: winston.format.json(),
  });

  const allowedOrigins = [
    'http://project.melodyn.nomoredomains.icu',
    'https://project.melodyn.nomoredomains.icu',
  ];

  const app = express();
  app.set('config', config);
  app.use(requestLogger);
  app.use(bodyParser.json());
  app.use(cors(
    {
      origin: config.IS_PROD ? allowedOrigins : '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  ));

  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });
  app.use('/', authRouter);
  app.use('/users', auth, userRouter);
  app.use('/cards', auth, cardRouter);
  app.use(errors());
  app.all('/*', (req, res) => {
    res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
  });
  app.use(errorLogger);
  app.use((err, req, res, next) => {
    const isHttpError = err instanceof HTTPError;
    const isValidatorError = isCelebrateError(err);
    const isModelError = (err.name === 'ValidationError') || (err.name === 'CastError');

    if (isHttpError) {
      res.status(err.statusCode).send({
        message: err.message,
      });
    }
    if (isModelError) {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
        message: `Переданы некоректные данные. ${err.message}`,
      });
    }
    if (!(isHttpError || isModelError || isValidatorError)) {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: err.message || 'Неизвестная ошибка',
      });
    }
    next();
  });

  mongoose.set('runValidators', true);
  await mongoose.connect(config.DB_URL);
  const server = app.listen(config.PORT, config.HOST, () => {
    console.log(`Server run on http://${config.HOST}:${config.PORT}`);
    process.send('ready');
  });

  const stop = async () => {
    console.log('Stop database');
    await mongoose.connection.close();
    console.log('Stop server');
    server.close();
    console.log('App stopped successfully');
    process.exit(0);
  };

  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
};
