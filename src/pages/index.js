import "./index.css";
import {
  editButton,
  addButton,
  popupProfile,
  popupCard,
  profileName,
  profileInfo,
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
  avatarPicture
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

const profileAvatarPopup = new PopupWithForm(avatarPopup, {
  addInfo: (item) => {
    api.setNewAvatar(item)
      .then((data) => {
        console.log(data)
        avatarPicture.setAttribute("src", data.avatar)
      })
      // .catch((err) => {
      //   renderError(`Ошибка: ${err}`);
      // })
      .finally(() => {
        loadingElements(false, avatarPopup.querySelector('.popup__button'));
      });
  },
});

profileAvatarPopup.setEventListeners();

const deletePopup = new PopupWithoutForm(delPopup, {
  doCardDelete: (cardToDelete) => {
    api.deleteCard(cardToDelete.id);
    cardToDelete.card.remove();
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
          element._span.textContent = data.likes.length;
          element = data.likes;
        })
      }
    },
    {
      handleDislikeClick: (element) => {
        api.dislikeCard(element._id).then((data) => {
          element._span.textContent = data.likes.length;
          element = data.likes;
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

const getowner = function () {
  api.getprofileInfo()
    .then((data) => {
      profileName.textContent = data.name;
      profileInfo.textContent = data.about;
      return
    })
    .catch((err) => {
      console.log(err);
    });
}

getowner();

const contentBox = new Section(
  {
    items: Promise.all([api.getprofileInfo(), api.getInitialCards()])
      .then((results) => {
        const owner = results[0];
        const cards = results[1];
        const ownersAndCards = { owner, cards };
        return ownersAndCards
      }),
    renderer: (item, profileMe) => {
      const card = createNewCard(item, profileMe);
      const cardElement = card.generateCard();
      contentBox.additem(cardElement);
    },
  },
  container
);

contentBox.renderItems();

const profile = new UserInfo({ profileName, profileInfo });

const popupForm = new PopupWithForm(popupProfile, {
  addInfo: (item) => {
    profile.setUserInfo(item);
    api.setProfileInfo(item).catch((err) => {
      renderError(`Ошибка: ${err}`);
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
    const myProfile = { _id: '0a7693a707e10be691360b74' }
    api.setNewCard(newDataCard)
      .then((data) => {
        const card = createNewCard(data, myProfile);
        const cardElement = card.generateCard();
        contentBox.additemUp(cardElement);
      }).catch((err) => {
        renderError(`Ошибка: ${err}`);
      })
      .finally(() => {
        loadingElements(false, popupCard.querySelector('.popup__button'));
      });
  },
});

popupAddCard.setEventListeners();

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

avatarButton.addEventListener('mouseover', () => {document.querySelector('.profile__avatar-cursor').classList.add('profile__avatar-cursor_visible')});
avatarButton.addEventListener('mouseout', () => {document.querySelector('.profile__avatar-cursor').classList.remove('profile__avatar-cursor_visible')});
avatarButton.addEventListener('click', () => { profileAvatarPopup.open()})




