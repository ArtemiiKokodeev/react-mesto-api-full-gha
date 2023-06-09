import { React, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card( { card, onCardClick, onCardLike, onCardConfirmDelete, onConfirmDelete } ) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );; 

  const handleCardClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
    // console.log(card);
  }

  const handleDeleteClick = () => {
    onCardConfirmDelete(card);
    onConfirmDelete();
  }

  return (
    <li className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick} />}
    </li>
  )
}

export default Card;