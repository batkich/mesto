
function showInputError (formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_type_active');
  errorElement.textContent = errorMessage;
}

function hideInputError (formSelector, inputSelector) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorElement.classList.add('popup__input-error_type_active');
  errorElement.textContent = '';
}

function isValid (formSelector, inputSelector) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
}

function setEventListeners (formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__button');
  toogleSaveButton (inputList, submitButtonSelector);
  inputList.forEach(function (inputSelector) {
    inputSelector.addEventListener('input', () =>{
      isValid(formSelector, inputSelector);
      toogleSaveButton (inputList, submitButtonSelector);
    });
  });
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toogleSaveButton (inputList, submitButtonSelector) {
  if (hasInvalidInput (inputList)) {
    submitButtonSelector.classList.add('popup__button_disabled');
    submitButtonSelector.setAttribute('disabled', 'disabled');
  } else {
    submitButtonSelector.classList.remove('popup__button_disabled');
    submitButtonSelector.removeAttribute('disabled');
  }
}

function enableValidation() {
  const popupList = Array.from(document.querySelectorAll('.popup__form'));
  popupList.forEach(function (formSelector) {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners (formSelector);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});



