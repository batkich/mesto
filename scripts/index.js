let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__link-edit');
let closeButton = document.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__info-name');
let profileInfo = document.querySelector('.profile__info-text');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.elements.nickname;
let jobInput = formElement.elements.info;



function openPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileInfo.textContent;
   popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener ('click', openPopup);
closeButton.addEventListener ('click', closePopup);

function formSubmitHandler (evt) {
       evt.preventDefault();
       profileName.textContent = nameInput.value;
       profileInfo.textContent = jobInput.value;
       closePopup()
}

formElement.addEventListener('submit', formSubmitHandler);
