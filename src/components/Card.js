export class Card {
  constructor (data, cardSelector, {handleCardClick}) {
    this._cardName = data.name;
    this._cardPicture = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    const picture = this._element.querySelector('.element__picture')
    picture.setAttribute('src', this._cardPicture);
    picture.setAttribute('alt', this._cardName);
    this._element.querySelector('.element__title').textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }

  _deleteListener() {
    this._element.remove();
}

_likeListener(){
    this._element.querySelector('.element__button').classList.toggle('element__button_type_active');
}

_pictureListener(){
    const pictureName = this._cardName;
    const pictureLink = this._cardPicture;
    this.handleCardClick({pictureName, pictureLink});
}

_setEventListeners() {
   this._element.querySelector('.element__delete-button').addEventListener('click', () => this._deleteListener());
   this._element.querySelector('.element__button').addEventListener('click', () => this._likeListener());
   this._element.querySelector('.element__picture').addEventListener('click', () => this._pictureListener());
}
}
