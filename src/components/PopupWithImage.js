import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.form = this._popup.querySelector(".popup__picture");
    this.formTitle = this._popup.querySelector(".popup__title_type_picture");
  }

  open({ pictureName, pictureLink }) {
    super.setEventListeners();
    this.form.setAttribute("src", pictureLink);
    this.form.setAttribute("alt", pictureName);
    this.formTitle.textContent = pictureName;
    super.open();
  }
}
