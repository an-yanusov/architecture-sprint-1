import React from 'react';
import Card from './Card';
import AddPlacePopup from './AddPlacePopup';
import api from "../utils/api";

function Main({ params, parentFuncs }) {
  const currentUserId = params.currentUserId;

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  
  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardClick(card) {
    parentFuncs.previewCard(card);
  }
  
  function handleCardLike(card) {
      const isLiked = card.likes.some((i) => i._id === currentUserId);
      api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
      api
        .removeCard(card._id)
        .then(() => {
          setCards((cards) => cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.log(err));
    }

  function onCardClick(card) {
    handleCardClick(card);
  }
  function onCardLike(card) {
    handleCardLike(card);
  }

  function onCardDelete(card) {
    handleCardDelete(card);
  }

  function handleAddPlaceSubmit(cardData) {
    parentFuncs.onAddPlace(cardData);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  return (
    <div>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      
      />
    </div>
  );
}

export default Main;
