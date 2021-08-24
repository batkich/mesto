import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (formSelector, {addInfo}) {
    super(formSelector);
    this.addInfo = addInfo;
  }

    _getInputValues() {
      this._inputList = this._formSelector.querySelectorAll('.popup__input');
      this._formValues = {};
      this._inputList.forEach((input) => this._formValues[input.name] = input.value);
      return this._formValues;
    }

   setEventListeners() {
     super.setEventListeners();
     this._formSelector.addEventListener('submit', this.addInfo);
   }

  close() {
    super.close();
    const form = this._formSelector.querySelector('.popup__form')
    form.reset();
  }
}
