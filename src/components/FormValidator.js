export class FormValidator {
  constructor(data, formElement) {
    this._formElement = formElement;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  // Артем, спасибо за подробные разьяснения, вроде уложилось в голове!
  // Метод clearPopupError() пришлось сделать публичным и вызывать его при открытии попапа, т.к. он вызывался один раз при открытии страницы.
  // А если в попапе оставить поля с ошибкой валидации и закрыть попап, то при новом открытии попапа ошибка валидации оставалась.

  _showInputError(item) {
    const errorElement = this._formElement.querySelector(`.${item.id}-error`);
    item.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = item.validationMessage;
  }

  _hideInputError(item) {
    const errorElement = this._formElement.querySelector(`.${item.id}-error`);
    item.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _isValid(item) {
    if (!item.validity.valid) {
      this._showInputError(item);
    } else {
      this._hideInputError(item);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toogleSaveButton() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  clearPopupError() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this.toogleSaveButton();
  }

  _setEventListeners() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
    this._inputList.forEach((item) => {
      item.addEventListener("input", () => {
        this._isValid(item);
        this.toogleSaveButton();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this.clearPopupError();
  }
}
