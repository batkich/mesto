import "./index.css";
import {
  editButton,
  addButton,
  popupProfile,
  popupCard,
  profileName,
  profileInfo,
  profileAvatar,
  profile_Id,
  nameInput,
  jobInput,
  container,
  validationSettings,
  popupPictureBox,
  profileFormElement,
  cardForm,
  delPopup,
  avatarButton,
  avatarPopup,
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from "../components/Card.js";
import { Api } from "../components/Api.js";
import { PopupWithoutForm } from "../components/PopupWithoutForm";

export function loadingElements(onLoad, popupButton) {
  if (onLoad) {
    popupButton.textContent = popupButton.textContent + '...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '235ae6c2-9d59-4d94-a816-03a2b688c17b',
    'Content-Type': 'application/json',
  }
});

Promise.all([api.getprofileInfo(), api.getInitialCards()])
      .then((results) => {
        const owner = results[0];
        profile.setUserInfo(owner);
        profileAvatar.src = owner.avatar;
        profile_Id._id = owner._id;
        const cards = results[1];
        const ownersAndCards = { owner, cards };
        contentBox.renderItems(ownersAndCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

const contentBox = new Section(
  {
    renderer: (item, profileMe) => {
      const card = createNewCard(item, profileMe);
      const cardElement = card.generateCard();
      contentBox.additem(cardElement);
    },
  },
  container
);

const profileAvatarPopup = new PopupWithForm(avatarPopup, {
  addInfo: (item) => {
        loadingElements(true, avatarPopup.querySelector('.popup__button'));

        // Здравствуйте Геннадий! Спасибо за подробные разьяснения в комментариях-замечаниях. После исправления получил более "глубокое" понимание
        // как все работает. Но не понял как сделать общую кнопку-константу (.popup__button) для всех попапов. Так как если искать ее в document,
        // получу первую кнопку. Поэтому в каждом попапе ищу кнопку отдельно (avatarPopup.querySelector('.popup__button'); popupProfile.querySelector('.popup__button');
        // popupCard.querySelector('.popup__button'));

    api.setNewAvatar(item)
      .then((data) => {
        profileAvatar.src = data.avatar
      })
      .then(() => {
        profileAvatarPopup.close();
      })
       .catch((err) => {
         console.log(`Ошибка: ${err}`);
       })
      .finally(() => {
        loadingElements(false, avatarPopup.querySelector('.popup__button'));
      });
  },
});

const deletePopup = new PopupWithoutForm(delPopup, {
  doCardDelete: (cardToDelete) => {
    api.deleteCard(cardToDelete.id)
    .then(() => {
      deletePopup.close();
      cardToDelete.card.remove();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });

  }
});

deletePopup.setEventListeners();

const newPopupImage = new PopupWithImage(popupPictureBox);
newPopupImage.setEventListeners();

function createNewCard(item, profileMe) {
  const card = new Card(item, profileMe, "#newcard", {
    handleCardClick: (element) => {
      newPopupImage.open(element);
    }
  },
    {
      handleDeleteClick: (element) => {
        deletePopup.open(element);
      }
    },
    {
      handleLikeClick: (element) => {
        api.likeCard(element._id).then((data) => {
          element.span.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      }
    },
    {
      handleDislikeClick: (element) => {
        api.dislikeCard(element._id).then((data) => {
          element.span.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      }
    },
  );
  return card;
}

const validationPopupCard = new FormValidator(validationSettings, cardForm);
validationPopupCard.enableValidation();

const validationPopupProfile = new FormValidator(
  validationSettings,
  profileFormElement
);
validationPopupProfile.enableValidation();

const validationPopupAvatar = new FormValidator(validationSettings, avatarPopup);
validationPopupAvatar.enableValidation();

const profile = new UserInfo({ profileName, profileInfo, profileAvatar, profile_Id });


const popupForm = new PopupWithForm(popupProfile, {
  addInfo: (item) => {
    loadingElements(true, popupProfile.querySelector('.popup__button'));
    api.setProfileInfo(item)
    .then((data) => {
      profile.setUserInfo(data);
      popupForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
      .finally(() => {
        loadingElements(false, popupProfile.querySelector('.popup__button'));
      });
  },
});

popupForm.setEventListeners();

const popupAddCard = new PopupWithForm(popupCard, {
  addInfo: (item) => {
    const newDataCard = {};
    newDataCard.name = item.newplace;
    newDataCard.link = item.picture;
    loadingElements(true, popupCard.querySelector('.popup__button'))
    api.setNewCard(newDataCard)
      .then((data) => {
        const card = createNewCard(data, profile_Id);
        const cardElement = card.generateCard();
        contentBox.additemUp(cardElement);
      })
      .then(() => {
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        loadingElements(false, popupCard.querySelector('.popup__button'));
      });
  },
});

popupAddCard.setEventListeners();
profileAvatarPopup.setEventListeners();

editButton.addEventListener("click", () => {
  popupForm.open();
  const profileData = profile.getUserInfo();
  nameInput.value = profileData.nickname;
  jobInput.value = profileData.info;
  validationPopupProfile.clearPopupError();
});

addButton.addEventListener("click", () => {
  validationPopupCard.toogleSaveButton();
  validationPopupCard.clearPopupError();
  popupAddCard.open();
});

avatarButton.addEventListener('click', () => {
  validationPopupAvatar.toogleSaveButton();
  validationPopupAvatar.clearPopupError();
  profileAvatarPopup.open()})

avatarButton.addEventListener('mouseover', () => {document.querySelector('.profile__avatar-cursor').classList.add('profile__avatar-cursor_visible')});
avatarButton.addEventListener('mouseout', () => {document.querySelector('.profile__avatar-cursor').classList.remove('profile__avatar-cursor_visible')});
