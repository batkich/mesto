import { Popup } from "./Popup.js";

export class PopupWithoutForm extends Popup {
  constructor(popup, { doCardDelete }) {
    super(popup);
    this.doCardDelete = doCardDelete;
    this.delButton = this._popup.querySelector('.popup__button_type_delete');
  }

  setEventListeners() {
    super.setEventListeners();
    this.delButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.doCardDelete(this.cardToDelete)
    });
  }

  open(item) {
    super.open();
    this.cardToDelete = item;
    return this.cardToDelete;
  }
}
