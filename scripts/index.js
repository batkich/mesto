const popupProfile = document.querySelector('.popup_type_profile');
const editButton = document.querySelector('.profile__link-edit');
const profileCloseButton = document.querySelector('.popup__close-icon_type_profile');
const cardCloseButton = document.querySelector('.popup__close-icon_type_card');
const pictureCloseButton = document.querySelector('.popup__close-icon_type_picture');
const profileName = document.querySelector('.profile__info-name');
const profileInfo = document.querySelector('.profile__info-text');
const profileFormElement = document.querySelector('.popup__form_type_profile');
const nameInput = profileFormElement.elements.nickname;
const jobInput = profileFormElement.elements.info;
const popupCard = document.querySelector('.popup_type_card');
const cardForm = document.querySelector('.popup__form_type_card');
const newPlace = cardForm.elements.newplace;
const newPicture = cardForm.elements.picture;
const elementList = document.querySelector('.elements')
const addButton = document.querySelector('.profile__link-add');
const newCard = document.querySelector('#newcard').content;
const popupPictureBox = document.querySelector('.popup_type_picture');
const popupPictureTitle = document.querySelector('.popup__title_type_picture');
const popupPicture = document.querySelector('.popup__picture');
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
 }

 function openPopup(item) {
  item.classList.add('popup_opened');
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

 function createCard (cardData) {
   const element = newCard.querySelector('.element').cloneNode(true);
   const cardName = element.querySelector('.element__title');
   const cardPicture = element.querySelector('.element__picture');
   cardName.textContent = cardData.name;
   cardPicture.src = cardData.link;
   cardPicture.alt = cardData.name;
   const likeButton = element.querySelector('.element__button');
   likeButton.addEventListener('click', function (evt) {
              evt.target.classList.toggle('element__button_type_active');
});
   const deleteButton = element.querySelector('.element__delete-button');
   deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
});
   cardPicture.addEventListener('click', function(){createButtonPicture(cardData)
  });
   return element;
 }

 initialCards.forEach((data) => {
  addCard(elementList, data);
});

  function addCard(container, data) {
    container.prepend(createCard(data));
  }

  function handleAddCard(evt) {
    evt.preventDefault();
    addCard(elementList, {name: newPlace.value, link: newPicture.value});
    newPlace.value = '';
    newPicture.value = '';
    closePopup(popupCard);
}

  function createButtonPicture(cardData) {
      popupPicture.src = cardData.link;
      popupPictureTitle.textContent = cardData.name;
      popupPicture.alt = cardData.name;
      openPopup(popupPictureBox);
    }

    function closePopupOverlay() {
      const popupArray = Array.from(document.querySelectorAll('.popup'));
      popupArray.forEach(function (popup) {
        popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('popup')) {
            closePopup(popup);
          }
        });
      });
    }

     function closePopupEsc() {
       const popupArray = Array.from(document.querySelectorAll('.popup'));
       popupArray.forEach(function (popup) {
        document.addEventListener('keydown', (evt) => {
           if (evt.key === "Escape") {
             closePopup(popup);
           }
         });
       });
     }

    closePopupOverlay();
    closePopupEsc();

  pictureCloseButton.addEventListener ('click', ()=> closePopup(popupPictureBox));
  editButton.addEventListener ('click', ()=> {
    openPopup(popupProfile);
    getProfileValue();
  });
  profileCloseButton.addEventListener ('click', ()=> closePopup(popupProfile));
  profileFormElement.addEventListener('submit', handleProfileFormSubmit);
  cardCloseButton.addEventListener ('click', ()=> closePopup(popupCard));
  addButton.addEventListener('click', ()=> openPopup(popupCard));
  cardForm.addEventListener('submit', handleAddCard);







