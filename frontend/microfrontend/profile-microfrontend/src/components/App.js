import React from "react";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };



  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }


  function handleUpdateUser(userUpdate) {
    api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
            setCurrentUser(newUserData);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
        setCurrentUser(newUserData);
            closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function onEditProfile () {
    setIsEditProfilePopupOpen(true);
  }

  function onEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }


  return (
    <section className="profile profile__section">
        <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
        <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__description">{currentUser.about}</p>
        </div>

        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
        />
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
        />
    </section>
  );
}

export default App;
