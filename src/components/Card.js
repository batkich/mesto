export class Card {
  constructor(data, profileMe, cardSelector, { handleCardClick }, { handleDeleteClick }, { handleLikeClick }, { handleDislikeClick }) {
    this._data = data;
    this._profileMe = profileMe
    this._cardName = data.name;
    this._cardPicture = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDislikeClick = handleDislikeClick;
    this.likesArr = data.likes;
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
    this._listenerLikeSpan();
    if (this._data.owner._id !== this._profileMe._id) {
      this._element.querySelector('.element__delete-button').classList.add('element__delete-button_disabled');
    }
    return this._element;
  }

  _listenerLikeSpan() {
    this._likeSpan = this._element.querySelector('.element__button-counter');
    this._likeSpan.textContent = this.likesArr.length;
    this.likesArr.forEach((item) => {
      if (item._id === this._profileMe._id)
        this._element.querySelector('.element__button').classList.add('element__button_type_active');
    })
  }

  _deleteListener() {
    const elementToDel = {};
    elementToDel.id = this._data._id;
    elementToDel.card = this._element;
    this.handleDeleteClick(elementToDel);
  }

  _likeListener() {
    this._element.querySelector('.element__button').classList.add('element__button_type_active');
    const likesThatCard = {};
    likesThatCard._id = this._data._id;
    likesThatCard.span = this._element.querySelector('.element__button-counter');
    this.handleLikeClick(likesThatCard);
  }

  _dislikeListener() {
    this._element.querySelector('.element__button').classList.remove('element__button_type_active');
    const likesThatCard = {};
    likesThatCard._id = this._data._id;
    likesThatCard.span = this._element.querySelector('.element__button-counter');
    this.handleDislikeClick(likesThatCard);
  }

  _pictureListener() {
    const pictureName = this._cardName;
    const pictureLink = this._cardPicture;
    this.handleCardClick({ pictureName, pictureLink });
  }

  _handleLike() {
    if (this._element.querySelector('.element__button').classList.contains('element__button_type_active')) {
      this._dislikeListener()
    } else {
      this._likeListener();
    }
  }


  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._deleteListener());
    this._element.querySelector('.element__button').addEventListener('click', () => this._handleLike());
    this._element.querySelector('.element__picture').addEventListener('click', () => this._pictureListener());
  }
}
