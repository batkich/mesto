import "./index.css";
import {
  editButton,
  addButton,
  popupProfile,
  popupCard,
  profileName,
  profileInfo,
  profileAvatar,
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
  popupAvatarButton,
  popupProfileButton,
  popupCardButton,
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

let profileId = null;

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
        profileId = owner;
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
        loadingElements(true, popupAvatarButton);
    api.setNewAvatar(item)
      .then((data) => {
        profile.setUserInfo(data);
      })
      .then(() => {
        profileAvatarPopup.close();
      })
       .catch((err) => {
         console.log(`Ошибка: ${err}`);
       })
      .finally(() => {
        loadingElements(false, popupAvatarButton);
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

const profile = new UserInfo({ profileName, profileInfo, profileAvatar, profileId });


const popupForm = new PopupWithForm(popupProfile, {
  addInfo: (item) => {
    loadingElements(true, popupProfileButton);
    api.setProfileInfo(item)
    .then((data) => {
      profile.setUserInfo(data);
      popupForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
      .finally(() => {
        loadingElements(false, popupProfileButton);
      });
  },
});

popupForm.setEventListeners();



const popupAddCard = new PopupWithForm(popupCard, {
  addInfo: (item) => {
    const newDataCard = {};
    newDataCard.name = item.newplace;
    newDataCard.link = item.picture;
    loadingElements(true, popupCardButton)
    api.setNewCard(newDataCard)
      .then((data) => {
        const card = createNewCard(data, profileId);
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
        loadingElements(false, popupCardButton);
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
