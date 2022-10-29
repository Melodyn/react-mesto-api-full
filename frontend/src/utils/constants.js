export const configByEnv = {
  production: {
    env: 'production',
    apiMestoBaseURL: 'https://api.project.melodyn.nomoredomains.icu',
    apiMestoAuthToken: '',
  },
  development: {
    env: 'development',
    apiMestoBaseURL: 'http://localhost:3000',
    apiMestoAuthToken: '',
  },
};

export const httpMethod = {
  get: 'GET',
  put: 'PUT',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

export const POPUP_NAME = Object.freeze([
  'PROFILE',
  'CARD',
  'AVATAR',
  'PREVIEW',
  'INFO',
].reduce((acc, value) => {
  acc[value] = value;
  return acc;
}, {}));

// Фикстура для локальной разработки
export const dataJSON = {
  profile: {
    _id: '635cf9ee0aca3c2575087d40',
    name: 'Меместо',
    about: 'Место ваших мемов',
    avatar: 'https://memepedia.ru/wp-content/uploads/2017/08/1492860042_e-news.su_ohuitelnye-istorii.gif',
    email: 'test@test.com',
  },
  places: [
    {
      _id: '635d002d0aca3c2575087d80',
      name: 'Rage Comics',
      link: 'https://memepedia.ru/wp-content/uploads/2017/03/rage-comics.jpg',
      owner: '635cf9ee0aca3c2575087d40',
      likes: [
        '635cff100aca3c2575087d70',
      ],
      createdAt: '2022-10-29T10:27:57.543Z',
    },
    {
      _id: '635d04680aca3c2575087dc6',
      name: 'Гарольд, скрывающий боль',
      link: 'https://memepedia.ru/wp-content/uploads/2016/03/hide-the-pain-harold.jpg',
      owner: '635cff100aca3c2575087d70',
      likes: [],
      createdAt: '2022-10-29T10:46:00.696Z',
    },
    {
      _id: '635d04780aca3c2575087dc8',
      name: 'Лягушонок Пепе',
      link: 'https://memepedia.ru/wp-content/uploads/2016/07/GaecXsgZG8Y.jpg',
      owner: '635cf9ee0aca3c2575087d40',
      likes: [],
      createdAt: '2022-10-29T10:46:16.332Z',
    },
    {
      _id: '635d04910aca3c2575087dd0',
      name: 'ЪУЪ Съука',
      link: 'https://memepedia.ru/wp-content/uploads/2019/03/u-suka-10.jpg',
      owner: '635cff100aca3c2575087d70',
      likes: [
        '635cff100aca3c2575087d70',
        '635cf9ee0aca3c2575087d40',
      ],
      createdAt: '2022-10-29T10:46:41.952Z',
    },
    {
      _id: '635d04a40aca3c2575087dd8',
      name: 'За Нерзула!',
      link: 'https://memepedia.ru/wp-content/uploads/2018/06/za-mamu-za-papu-mem-12.jpg',
      owner: '635cf9ee0aca3c2575087d40',
      likes: [
        '635cf9ee0aca3c2575087d40',
      ],
      createdAt: '2022-10-29T10:47:00.267Z',
    },
    {
      _id: '635d04eb0aca3c2575087de0',
      name: 'Бонжур, епта',
      link: 'https://memepedia.ru/wp-content/uploads/2019/08/screenshot_17-2-768x500.png',
      owner: '635cff100aca3c2575087d70',
      likes: [],
      createdAt: '2022-10-29T10:48:11.293Z',
    },
  ],
};
