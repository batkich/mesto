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
} from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { createNewCard } from "../utils/utils";

export const newPopupImage = new PopupWithImage(popupPictureBox);

const validationPopupCard = new FormValidator(validationSettings, popupCard);
validationPopupCard.enableValidation();

const validationPopupProfile = new FormValidator(
  validationSettings,
  popupProfile
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
    contentBox.additem(cardElement);
    // validationPopupCard.toogleSaveButton();
  },
});

popupAddCard.setEventListeners();

editButton.addEventListener("click", () => {
  popupForm.open();
  const profileData = profile.getUserInfo();
  nameInput.value = profileData.nickname;
  jobInput.value = profileData.info;
});

addButton.addEventListener("click", () => {
  popupCard
    .querySelector(".popup__button")
    .setAttribute("disabled", "disabled");
  popupCard
    .querySelector(".popup__button")
    .classList.add("popup__button_disabled");
  popupAddCard.open();
});
