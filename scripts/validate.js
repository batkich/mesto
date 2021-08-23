function showInputError (formSelector, inputSelector, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError (formSelector, inputSelector, inputErrorClass, errorClass) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = '';
}

function isValid (formSelector, inputSelector, inputErrorClass, errorClass) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formSelector, inputSelector, inputErrorClass, errorClass);
  }
}

function setEventListeners (formSelector, obj) {
  const inputList = Array.from(formSelector.querySelectorAll(obj.inputSelector));
  const submitButtonSelector = formSelector.querySelector(obj.submitButtonSelector);
  const inactiveButtonClass = obj.inactiveButtonClass;
  const inputErrorClass = formSelector.querySelector(obj.inputErrorClass);
  const errorClass = obj.errorClass;
  submitButtonSelector.classList.add(inactiveButtonClass);
  submitButtonSelector.setAttribute('disabled', 'disabled');
  toogleSaveButton (inputList, submitButtonSelector);
  inputList.forEach(function (inputSelector) {
    inputSelector.addEventListener('input', () =>{
      isValid(formSelector, inputSelector, inputErrorClass, errorClass);
      toogleSaveButton (inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toogleSaveButton (inputList, submitButtonSelector, inactiveButtonClass) {
  if (hasInvalidInput (inputList)) {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', 'disabled');
  } else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled');
  }
}

function enableValidation(obj) {
  const popupList = Array.from(document.querySelectorAll(obj.formSelector));
  popupList.forEach(function (formSelector) {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners (formSelector, obj);
  })
}