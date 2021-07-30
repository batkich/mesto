import { popupPictureBox, popupPictureTitle, popupPicture, openPopup } from './index.js';

export class Card {
  constructor (data, cardSelector) {
    this._cardName = data.name;
    this._cardPicture = data.link;
    this._cardSelector = cardSelector;
  }

  _getCard() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getCard();
    this._element.querySelector('.element__picture').setAttribute('src', this._cardPicture);
    this._element.querySelector('.element__title').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._element.remove();
    });
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._element.querySelector('.element__button').classList.toggle('element__button_type_active');
    });
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      popupPicture.setAttribute('src', this._cardPicture);
      popupPicture.setAttribute('alt', this._cardName);
      popupPictureTitle.textContent = this._cardName;
      openPopup(popupPictureBox);
    });
  }

}
