const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__link-edit');
const closeButton = document.querySelectorAll('.popup__close-icon');
const profileName = document.querySelector('.profile__info-name');
const profileInfo = document.querySelector('.profile__info-text');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.elements.nickname;
const jobInput = formElement.elements.info;

function openPopup() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileInfo.textContent;
   popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener ('click', openPopup);
closeButton[0].addEventListener ('click', closePopup);

function formSubmitHandler (evt) {
       evt.preventDefault();
       profileName.textContent = nameInput.value;
       profileInfo.textContent = jobInput.value;
       closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

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

let elementList = document.querySelector('.elements')
const addButton = document.querySelector('.profile__link-add');
let newCard = document.querySelector('#newcard').content;
let cardClone;
let cardName;
let cardPicture;

function cloneCard () {
     cardClone = newCard.querySelector('.element').cloneNode(true);
}

function allCards () {
  cloneCard ();
  cardName = cardClone.querySelector('.element__title');
  cardPicture = cardClone.querySelector('.element__picture');
  elementList.prepend(cardClone);
  cardName.textContent = initialCards[i].name;
  cardPicture.src = initialCards[i].link;
}

function cardArray() {
  for(i = 0; i<initialCards.length; i = i + 1) {
   allCards();
 }
 }

cardArray();

let popupCard = document.querySelector('.popup_type_card');
let cardForm = document.querySelector('.popup__form_type_card');
let newPlace = cardForm.elements.newplace;
let newPicture = cardForm.elements.picture;
let saveCardButton = document.querySelector('.popup__save-button_type_card');
let firstCard = {
  name: '',
  link: ''
}

function openPopupCard() {
  popupCard.classList.add('popup_opened');
}

function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}

closeButton[1].addEventListener ('click', closePopupCard);
addButton.addEventListener('click', openPopupCard);

function addCard(evt) {
  evt.preventDefault();
  initialCards.splice(0, Infinity);
  initialCards.unshift(firstCard);
  initialCards[0].name = newPlace.value;
  initialCards[0].link = newPicture.value;
  cardArray();
  closePopupCard();
  removeCard();
  createButtonPicture ();
  likeButtonActivate();
  newPlace.value = '';
  newPicture.value = '';

}

cardForm.addEventListener('submit', addCard);

function likeButtonActivate(element){
element = cardClone.querySelector('.element__button');
element.addEventListener('click', function (evt) {
       evt.target.classList.toggle('element__button_type_active');
  ;})
  }

 function likeButtonActivateinPage() {
   likeButton = document.querySelectorAll('.element__button');
   Array.from(likeButton).map(function(element){
    return element.addEventListener('click', function (evt) {
     evt.target.classList.toggle('element__button_type_active');
     console.log(element);
   });
 });
 }

 likeButtonActivateinPage();

function removeCard() {
   const deleteButton = document.querySelectorAll('.element__delete-button');
   deleteButton.forEach(function(element) {
   element.addEventListener('click', function(){
    const deleteCard = element.closest('.element');
    deleteCard.remove();
   })
   })
  }

  removeCard();

let popupPictureBox = document.querySelector('.popup_type_picture');
let pictureButton;
let pictureTitle;
let popupPictureTitle;
let popupPicture;

function openPopupPicture() {
  popupPictureBox.classList.add('popup_opened');
}

function closePopupPicture() {
  popupPictureBox.classList.remove('popup_opened');
}

closeButton[2].addEventListener ('click', closePopupPicture);

function createButtonPicture() {
  pictureButton = document.querySelectorAll('.element__picture');
  pictureTitle = document.querySelectorAll('.element__title');
  popupPictureTitle = document.querySelector('.popup__title_type_picture');
  popupPicture = document.querySelector('.popup__picture');
  pictureButton.forEach(function(element) {
    element.addEventListener('click', function(){
    openPopupPicture();
    popupPicture.src = element.src;
    popupPictureTitle.textContent = element.nextElementSibling.firstElementChild.textContent;

    });
    });
}

createButtonPicture ();


