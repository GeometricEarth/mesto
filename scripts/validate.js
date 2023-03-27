const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};
const formElementStorage = {};

function resetValidation(formName, isButtonEnabled) {
  const form = formElementStorage[formName];
  const submitButton = form.submitButtonElement;

  for (let element in form.errorElementList) {
    form.errorElementList[element].classList.remove(validationConfig.errorClass);
  }

  form.fieldList.forEach((element) => {
    element.classList.remove(validationConfig.inputErrorClass);
  });

  isButtonEnabled
    ? enableSubmintButton(submitButton, validationConfig.inactiveButtonClass)
    : disableSubmintButton(submitButton, validationConfig.inactiveButtonClass);
}

function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...config }) {
  const formList = document.querySelectorAll(formSelector);
  formList.forEach((formElement) => {
    const elementStorage = {};
    elementStorage.errorElementList = {};

    const submitButtonElement = formElement.querySelector(submitButtonSelector);
    elementStorage.fieldList = formElement.querySelectorAll(inputSelector);

    elementStorage.fieldList.forEach((fieldElement) => {
      const errorMessageElement = formElement.querySelector(`.${fieldElement.name}-error`);
      elementStorage.errorElementList[fieldElement.name] = errorMessageElement;
    });
    elementStorage.submitButtonElement = submitButtonElement;
    formElementStorage[formElement.name] = elementStorage;

    addFieldListeners(formElement.name, config);
  });
}

function addFieldListeners(formName, { inactiveButtonClass, inputErrorClass, errorClass }) {
  const form = formElementStorage[formName];
  form.fieldList.forEach((fieldElement) => {
    fieldElement.addEventListener('input', () => {
      checkFieldValidity(formName, fieldElement, errorClass, inputErrorClass);
      checkSubmitButtonState(formName, inactiveButtonClass);
    });
  });
}

function checkFieldValidity(formName, fieldElement, errorClass, inputErrorClass) {
  const errorMessageElement = formElementStorage[formName].errorElementList[fieldElement.name];
  if (fieldElement.validity.valid) {
    hideError(fieldElement, errorMessageElement, errorClass, inputErrorClass);
  } else {
    showError(fieldElement, errorMessageElement, errorClass, inputErrorClass);
  }
}

function showError(fieldElement, errorMessageElement, errorClass, inputErrorClass) {
  const errorMessage = fieldElement.validationMessage;
  errorMessageElement.innerText = errorMessage;
  errorMessageElement.classList.add(errorClass);
  fieldElement.classList.add(inputErrorClass);
}

function hideError(fieldElement, errorMessageElement, errorClass, inputErrorClass) {
  errorMessageElement.innerText = '';
  errorMessageElement.classList.remove(errorClass);
  fieldElement.classList.remove(inputErrorClass);
}

function enableSubmintButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function disableSubmintButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function checkSubmitButtonState(formName, inactiveButtonClass) {
  const form = formElementStorage[formName];
  hasInvalidFild(form.fieldList)
    ? disableSubmintButton(form.submitButtonElement, inactiveButtonClass)
    : enableSubmintButton(form.submitButtonElement, inactiveButtonClass);
}

function hasInvalidFild(fieldList) {
  return Array.from(fieldList).some((fieldElement) => {
    return fieldElement.validity.valid ? false : true;
  });
}
// enableValidation(validationConfig);
