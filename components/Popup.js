export class Popup {
  constructor(formSelector) {
    this._formSelector = formSelector;
  }

    _handleEscClose() {
     document.addEventListener('keydown', (evt) => {
     if (evt.key === "Escape") {
        this.close();
      }
     });
    }

   setEventListeners() {
     this._handleEscClose();
     this._formSelector.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
          this.close();
        }
      });
   }

  open() {
    this._formSelector.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._formSelector.classList.remove('popup_opened');
  }
}
