
function showInputError (popupElement, popupInput, errorMessage) {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_type_active');
  errorElement.textContent = errorMessage;
}

function hideInputError (popupElement, popupInput) {
  const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove('popup__input_type_error');
  errorElement.classList.add('popup__input-error_type_active');
  errorElement.textContent = '';
}

function isValid (popupElement, popupInput) {
  if (!popupInput.validity.valid) {
    showInputError(popupElement, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupElement, popupInput);
  }
}

function setEventListeners (popupElement) {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  const submitButtonSelector = popupElement.querySelector('.popup__button');
  toogleSaveButton (inputList, submitButtonSelector);
  inputList.forEach(function (popupInput) {
    popupInput.addEventListener('input', () =>{
      isValid(popupElement, popupInput);
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

function formSearch() {
  const popupList = Array.from(document.querySelectorAll('.popup__form'));
  popupList.forEach(function (popupElement) {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners (popupElement);
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

formSearch();


