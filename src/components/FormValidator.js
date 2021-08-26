export class FormValidator {
  constructor(data, formSelector) {
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
    errorElement.textContent = "";
  }

  _isValid(item) {
    if (!item.validity.valid) {
      this._showInputError(item);
    } else {
      this._hideInputError(item);
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Здравствуйте Артем! Два дня пытался понять как переделать проект в соответсвии с теми требованиями, что вы написали в замечаниях. Вроде все наколнец "победил", но,
  // видимо, голова совсем перестала соображать, и я не могу понять последнее вышеуказанное критическое замечание
  // (Ваше замечание: запомните кнопку и поля ввода в поле класса FormValidator в конструкторе, что бы в методах их не искать и не передавать как параметры, а брать из полей класса);
  // Вы предложили следующий код:         this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  //                                      this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
  // У меня в классе нет _formElement, видимо это "_formSelector". И совсем не понятна конструкция this._settings.submitButtonSelector.
  // Не понимаю что за поле или метод _settings. У меня такого тоже нет и если нужно создать новое поле, что это будет?
  // Видимо эта настройка необходимо для добавления "toogleSaveButton" при создании класса. Потому что если ставить этот метод в новый класс формы в том состоянии
  // как сейчас - ничего не работает.
  // В связи с чем реализовал отключение кнопки при нажатии кнопки "AddButton".

  toogleSaveButton(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._formSelector
        .querySelector(this._submitButtonSelector)
        .classList.add(this._inactiveButtonClass);
      this._formSelector
        .querySelector(this._submitButtonSelector)
        .setAttribute("disabled", "disabled");
    } else {
      this._formSelector
        .querySelector(this._submitButtonSelector)
        .classList.remove(this._inactiveButtonClass);
      this._formSelector
        .querySelector(this._submitButtonSelector)
        .removeAttribute("disabled");
    }
  }

  _clearPopupError() {
    const error = this._formSelector.querySelectorAll(".popup__error");
    const errorLine = this._formSelector.querySelectorAll(".popup__input");
    const errorClass = this._errorClass;
    const inputError = this._inputErrorClass;
    error.forEach(function (element) {
      element.classList.remove(errorClass);
    });
    errorLine.forEach(function (element) {
      element.classList.remove(inputError);
    });
  }

  _setEventListeners() {
    const inputList = this._formSelector.querySelectorAll(this._inputSelector);
    const submitButtonSelector = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    const inactiveButtonClass = this._inactiveButtonClass;
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.setAttribute("disabled", "disabled");
    inputList.forEach((item) => {
      item.addEventListener("input", () => {
        this._isValid(item);
        this.toogleSaveButton(inputList);
      });
    });
  }

  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
    this._clearPopupError();
  }
}
