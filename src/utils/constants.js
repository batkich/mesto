export const popupPictureTitle = document.querySelector('.popup__title_type_picture');
export const popupPicture = document.querySelector('.popup__picture');
export const popupPictureBox = document.querySelector('.popup_type_picture');
export const profileName = document.querySelector('.profile__info-name');
export const profileInfo = document.querySelector('.profile__info-text');
export const profileFormElement = document.querySelector('.popup__form_type_profile');
export const nameInput = profileFormElement.elements.nickname;
export const jobInput = profileFormElement.elements.info;
export const addButton = document.querySelector('.profile__link-add');
export const editButton = document.querySelector('.profile__link-edit');
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupCard = document.querySelector('.popup_type_card');
export const cardForm = document.querySelector('.popup__form_type_card');
export const newPlace = cardForm.elements.newplace;
export const newPicture = cardForm.elements.picture;
export const container = document.querySelector('.elements');
export const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

import sochi from '../images/sochi.png';
import sheregesh from '../images/sheregesh.png';
import karely from '../images/karely.png';
import Moscow from '../images/moscow.png';
import Tomsk from '../images/tomsk.png';
import altai from '../images/altai.png';

export const initialCards = [
  {
    name: 'Сочи',
    link: sochi
  },
  {
    name: 'Шерегеш',
    link: sheregesh
  },
  {
    name: 'Карелия',
    link: karely
  },
  {
    name: 'Москва',
    link: Moscow
  },
  {
    name: 'Томск',
    link: Tomsk
  },
  {
    name: 'Алтай',
    link: altai
  }
];
