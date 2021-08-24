import './index.css';
import { editButton, addButton, initialCards, popupProfile, popupCard, profileName, profileInfo, nameInput, jobInput, newPlace, newPicture,
container, validationSettings, popupPictureBox} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

const contentBox = new Section ({items: initialCards, renderer: (item) => {
    const card = new Card(item, '#newcard', {handleCardClick: (element) =>{
      const newPopupImage = new PopupWithImage (popupPictureBox);
      newPopupImage.open(element);
    }});
    const cardElement = card.generateCard();
    contentBox.additem(cardElement);
  }}, container);

  contentBox.renderItems();

  const profile = new UserInfo ({profileName, profileInfo});
  profile.name = profileName.textContent;
  profile.job = profileInfo.textContent;
  const userdata = profile.getUserInfo();
  nameInput.value = userdata.name;
  jobInput.value = userdata.job;

  const popupForm = new PopupWithForm (popupProfile, {addInfo: (evt) => {
    evt.preventDefault();
    profile.setUserInfo(popupForm);
    popupForm.close();
  }});

  const popupAddCard = new PopupWithForm (popupCard, {addInfo: (evt) => {
    evt.preventDefault();
    const newPlaceValue = newPlace.value;
    const newPictureValue = newPicture.value;
    const newCard = new Card({name: newPlaceValue, link: newPictureValue}, '#newcard', {handleCardClick: (element) =>{
      const newPopupImage = new PopupWithImage (popupPictureBox);
      newPopupImage.open(element);
    }});
    const cardElement = newCard.generateCard();
    document.querySelector('.elements').prepend(cardElement);
    popupAddCard.close();
  }});

  editButton.addEventListener ('click', () => {popupForm.open();
    const validation = new FormValidator (validationSettings,  popupProfile);
    validation.enableValidation();
});

addButton.addEventListener('click', () => {popupAddCard.open();
  const validation = new FormValidator (validationSettings,  popupCard);
  validation.enableValidation();
});
