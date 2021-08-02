export class FormValidator {
  constructor (data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
  }

   _showInputError(item) {
    const errorElement = this._formSelector.querySelector(`.${item.id}-error`);
    item.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = item.validationMessage;
   }

   _hideInputError(item) {
    const errorElement = this._formSelector.querySelector(`.${item.id}-error`);
    item.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
   }

   _isValid (item) {
    if (!item.validity.valid) {
      this._showInputError(item);
     } else {
      this._hideInputError(item);
     }
   }

   _hasInvalidInput (inputList) {
    return (Array.from(inputList)).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

   _toogleSaveButton (inputList) {
     if (this._hasInvalidInput (inputList)) {
       this._formSelector.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
       this._formSelector.querySelector(this._submitButtonSelector).setAttribute('disabled', 'disabled');
     } else {
      this._formSelector.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
      this._formSelector.querySelector(this._submitButtonSelector).removeAttribute('disabled');
     }
   }

    _clearPopupError () {
     const error = this._formSelector.querySelectorAll('.popup__error');
     const errorLine = this._formSelector.querySelectorAll('.popup__input');
     error.forEach(function (element) {
         element.classList.remove('popup__error_visible')
     });
     errorLine.forEach(function (element) {
      element.classList.remove('popup__input_type_error')
  });
   }

   _setEventListeners () {
     const inputList = this._formSelector.querySelectorAll(this._inputSelector);
     const submitButtonSelector = this._formSelector.querySelector(this._submitButtonSelector);
     const inactiveButtonClass = this._inactiveButtonClass;
     submitButtonSelector.classList.add(inactiveButtonClass);
     submitButtonSelector.setAttribute('disabled', 'disabled');
     inputList.forEach((item) => {
       item.addEventListener('input', () => {
          this._isValid(item);
          this._toogleSaveButton (inputList);
       });
     });
   }

   enableValidation() {
       this._formSelector.addEventListener('submit', (evt) => {
         evt.preventDefault();
       });
        this._setEventListeners ();
        this._clearPopupError ();
   }
}

