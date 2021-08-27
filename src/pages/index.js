import "./index.css";
import {
  editButton,
  addButton,
  initialCards,
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
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Card } from "../components/Card.js";

const newPopupImage = new PopupWithImage(popupPictureBox);
newPopupImage.setEventListeners();

function createNewCard(item) {
  const card = new Card(item, "#newcard", {
    handleCardClick: (element) => {
      newPopupImage.open(element);
    },
  });
  return card;
}

const validationPopupCard = new FormValidator(validationSettings, cardForm);
validationPopupCard.enableValidation();

const validationPopupProfile = new FormValidator(
  validationSettings,
  profileFormElement
);
validationPopupProfile.enableValidation();

const contentBox = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createNewCard(item);
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
  },
});

popupForm.setEventListeners();

const popupAddCard = new PopupWithForm(popupCard, {
  addInfo: (item) => {
    const newDataCard = {};
    newDataCard.name = item.newplace;
    newDataCard.link = item.picture;
    const card = createNewCard(newDataCard);
    const cardElement = card.generateCard();
    contentBox.additemUp
    (cardElement);
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
