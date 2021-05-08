const popupProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__link-edit');
const profileCloseButton = document.querySelector('.popup__close-icon_type_profile');
const cardCloseButton = document.querySelector('.popup__close-icon_type_card');
const pictureCloseButton = document.querySelector('.popup__close-icon_type_picture');
const profileName = document.querySelector('.profile__info-name');
const profileInfo = document.querySelector('.profile__info-text');
const profileFormElement = document.querySelector('.popup__form_type_profile');
nameInput = profileFormElement.elements.nickname;
jobInput = profileFormElement.elements.info;
const popupCard = document.querySelector('.popup_type_card');
const cardForm = document.querySelector('.popup__form_type_card');
const newPlace = cardForm.elements.newplace;
const newPicture = cardForm.elements.picture;
const saveCardButton = document.querySelector('.popup__save-button_type_card');
const firstCard = {
   name: '',
   link: ''
 }
const elementList = document.querySelector('.elements')
const addButton = document.querySelector('.profile__link-add');
const newCard = document.querySelector('#newcard').content;
const popupPictureBox = document.querySelector('.popup_type_picture');
const popupPictureTitle = document.querySelector('.popup__title_type_picture');
const popupPicture = document.querySelector('.popup__picture');
let pictureButton;
let pictureTitle;
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

 function getProfileValue() {
     nameInput.value = profileName.textContent;
     jobInput.value = profileInfo.textContent;
     return;
 }

 function openPopup(item) {
  item.classList.add('popup_opened');
  return;
}

function closePopup(item) {
  item.classList.remove('popup_opened');
 }

 function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupProfile);
}

function createCardsonPage() {
  for(i = 0; i<initialCards.length; i = i + 1) {
   createCard();
 }
 }

 function createCard (element) {
  const cardClone = newCard.querySelector('.element').cloneNode(true);
  const cardName = cardClone.querySelector('.element__title');
  const cardPicture = cardClone.querySelector('.element__picture');
  elementList.prepend(cardClone);
  cardName.textContent = initialCards[i].name;
  cardPicture.src = initialCards[i].link;
  cardPicture.setAttribute('alt', cardName.textContent);
  element = cardClone.querySelector('.element__button');
  element.addEventListener('click', function (evt) {
       evt.target.classList.toggle('element__button_type_active');
  ;});
  const deleteButton = document.querySelectorAll('.element__delete-button');
   deleteButton.forEach(function(element) {
   element.addEventListener('click', function(){
    const deleteCard = element.closest('.element');
    deleteCard.remove();
   });
   });
}

function handleAddCard(evt) {
  evt.preventDefault();
  initialCards.splice(0, Infinity);
  initialCards.unshift(firstCard);
  initialCards[0].name = newPlace.value;
  initialCards[0].link = newPicture.value;
  createCardsonPage();
  closePopup(popupCard);
  createButtonPicture();
  newPlace.value = '';
  newPicture.value = '';
}

function createButtonPicture() {
  pictureButton = document.querySelectorAll('.element__picture');
  pictureTitle = document.querySelectorAll('.element__title');
  pictureButton.forEach(function(element) {
    element.addEventListener('click', function(){
    openPopup(popupPictureBox);
    popupPicture.src = element.src;
    popupPictureTitle.textContent = element.closest('.element').querySelector('.element__title').textContent;
    popupPicture.setAttribute('alt', popupPictureTitle.textContent);
    });
    });
}

getProfileValue();
createCardsonPage();
createButtonPicture ();

pictureCloseButton.addEventListener ('click', ()=> closePopup(popupPictureBox));
editButton.addEventListener ('click', ()=> openPopup(popupProfile));
profileCloseButton.addEventListener ('click', ()=> closePopup(popupProfile));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardCloseButton.addEventListener ('click', ()=> closePopup(popupCard));
addButton.addEventListener('click', ()=> openPopup(popupCard));
cardForm.addEventListener('submit', handleAddCard);
