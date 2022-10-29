import { useContext } from 'react';
import cn from 'classnames';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Card } from './Card';

const Main = (props) => {
  const {
    cards,
    onEditProfile,
    onAddCard,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardRemove,
  } = props;
  const currentUser = useContext(CurrentUserContext);

  let notHasCards = true;
  const cardComponents = [];
  if (cards.length === 0) {
    cardComponents.push((<li key="1" className="subtitle subtitle_color_gray">Нет карточек</li>));
  } else if (cards[0] === null) {
    cardComponents.push((<li key="1" className="subtitle subtitle_color_gray">Загрузка...</li>));
  } else {
    notHasCards = false;
    cards.forEach((card) => cardComponents.push(<Card
      key={card._id}
      card={card}
      onClick={onCardClick}
      onLike={onCardLike}
      onRemove={onCardRemove}
    />));
  }
  const ulClassName = cn(
    'cards__list',
    { title_centered: notHasCards },
  );

  return (
    <main className="content">
      <section className="profile" aria-label="Описание блога">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар блога"
            className="profile__avatar"
          />
          <div
            className="profile__avatar-overlay"
            role="button"
            aria-label="Обновить аватар"
            aria-hidden="true"
            onClick={onEditAvatar}
          />
        </div>
        <h1 className="profile__title">{currentUser.name}</h1>
        <button
          type="button"
          className="button profile__edit"
          aria-label="Редактировать"
          onClick={onEditProfile}
        />
        <p className="subtitle profile__subtitle">{currentUser.about}</p>
        <button
          type="button"
          className="button profile__add-card"
          aria-label="Добавить место"
          onClick={onAddCard}
        />
      </section>

      <section className="cards" aria-label="Красивые картинки">
        <ul className={ulClassName}>{cardComponents}</ul>
      </section>
    </main>
  );
};

export { Main };
