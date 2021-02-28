let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__link-edit');
let closeButton = document.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__info-name');
let profileInfo = document.querySelector('.profile__info-text');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.elements.nickname;
let jobInput = formElement.elements.info;



function openPopup() {
   popup.classList.add('popup_opened');
   nameInput.value = profileName.innerHTML;
   jobInput.value = profileInfo.innerHTML;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener ('click', openPopup);
closeButton.addEventListener ('click', closePopup);

function formSubmitHandler (evt) {
       evt.preventDefault();
       nameInput = nameInput.value;
       jobInput = jobInput.value;
      profileName.textContent = nameInput;
      profileInfo.textContent = jobInput;
      popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
