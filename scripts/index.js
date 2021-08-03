import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__link-edit');
const profileName = document.querySelector('.profile__info-name');
const profileInfo = document.querySelector('.profile__info-text');
const profileFormElement = document.querySelector('.popup__form_type_profile');
const nameInput = profileFormElement.elements.nickname;
const jobInput = profileFormElement.elements.info;
const popupCard = document.querySelector('.popup_type_card');
const cardForm = document.querySelector('.popup__form_type_card');
const newPlace = cardForm.elements.newplace;
const newPicture = cardForm.elements.picture;
const addButton = document.querySelector('.profile__link-add');
export const popupPictureBox = document.querySelector('.popup_type_picture');
export const popupPictureTitle = document.querySelector('.popup__title_type_picture');
export const popupPicture = document.querySelector('.popup__picture');
const initialCards = [
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

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

 function getProfileValue() {
     nameInput.value = profileName.textContent;
     jobInput.value = profileInfo.textContent;
 }

export function openPopup(item) {
  item.classList.add('popup_opened');
     document.addEventListener('keydown', handlePressEsc);
}

function openPopupWithValidation (item) {
  openPopup(item);
  const validation = new FormValidator (validationSettings, item);
  validation.enableValidation();
}

// Максим, спасибо за подробные объяснения. В общих чертах понял предложенный способ реализации валидации для каждого Попапа отдельно.
// Но решил не ломать код (и в итоге не доламывать свою голову)). Поправил свою реализацию.
// Добавил еще функцию (не понял, нужно исправлять баг или нет) clearInputsPopupCards для очистки input-ов формы добавления карточки. Надеюсь не будет лишней.

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEsc);
}

 function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupProfile);
}

    function closePopupOverlay() {
      const popupArray = Array.from(document.querySelectorAll('.popup'));
      popupArray.forEach(function (popup) {
        popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
            closePopup(popup);
          }
        });
      });
    }

     function handlePressEsc(evt) {
      if (evt.key === "Escape") {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
  }

  closePopupOverlay();

  initialCards.forEach((item) => {
    const card = new Card(item, '#newcard');
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
    });

function handleAddCard (evt) {
  evt.preventDefault();
  const card = new Card ({name: newPlace.value, link: newPicture.value}, '#newcard');
  const cardElement = card.generateCard();
  cardForm.reset();
  closePopup(popupCard);
  document.querySelector('.elements').prepend(cardElement);
}

function clearInputsPopupCards (item) {
  const errorContent = item.querySelectorAll('.popup__input');
  errorContent.forEach((element) => {
    element.value = '';
  });
}

cardForm.addEventListener('submit', handleAddCard);

editButton.addEventListener ('click', () => {
  openPopupWithValidation (popupProfile);
  getProfileValue();
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
  openPopupWithValidation (popupCard);
  clearInputsPopupCards (popupCard);
});
