import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, { addInfo }) {
    super(popup);
    this.addInfo = addInfo;
    this.form = this._popup.querySelector(".popup__form");
    this._popupButton = this.form.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.addInfo(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();
  }
}


