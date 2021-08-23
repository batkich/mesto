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
export const initialCards = [
  {
    name: 'Сочи',
    link: './images/sochi.png'
  },
  {
    name: 'Шерегеш',
    link: './images/sheregesh.png'
  },
  {
    name: 'Карелия',
    link: './images/karely.png'
  },
  {
    name: 'Москва',
    link: './images/moscow.png'
  },
  {
    name: 'Томск',
    link: './images/tomsk.png'
  },
  {
    name: 'Алтай',
    link: './images/altai.png'
  }
];
