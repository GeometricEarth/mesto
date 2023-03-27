export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    this._errorElementList = {};
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._fieldList = this._formElement.querySelectorAll(this._config.inputSelector);

    this._fieldList.forEach((fieldElement) => {
      const errorMessageElement = this._formElement.querySelector(`.${fieldElement.name}-error`);
      this._errorElementList[fieldElement.name] = errorMessageElement;
      this._addFieldListeners(fieldElement);
    });
  }

  _addFieldListeners(fieldElement) {
    fieldElement.addEventListener('input', () => {
      this._checkFieldValidity(fieldElement);
      this.checkSubmitButtonState();
    });
  }

  _checkFieldValidity(fieldElement) {
    const errorMessageElement = this._errorElementList[fieldElement.name];
    if (fieldElement.validity.valid) {
      this._hideError(fieldElement, errorMessageElement);
    } else {
      this._showError(fieldElement, errorMessageElement);
    }
  }

  resetValidation(isButtonEnabled) {
    for (let element in this._errorElementList) {
      this._errorElementList[element].classList.remove(this._config.errorClass);
    }

    this._fieldList.forEach((element) => {
      element.classList.remove(this._config.inputErrorClass);
      element.innerText = '';
    });

    isButtonEnabled ? this._enableSubmintButton() : this._disableSubmintButton();
  }

  checkSubmitButtonState() {
    this._hasInvalidFild() ? this._disableSubmintButton() : this._enableSubmintButton();
  }

  _hasInvalidFild() {
    return Array.from(this._fieldList).some((fieldElement) => {
      return fieldElement.validity.valid ? false : true;
    });
  }

  _showError(fieldElement, errorMessageElement) {
    const errorMessage = fieldElement.validationMessage;
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.classList.add(this._config.errorClass);
    fieldElement.classList.add(this._config.inputErrorClass);
  }

  _hideError(fieldElement, errorMessageElement) {
    errorMessageElement.innerText = '';
    errorMessageElement.classList.remove(this._config.errorClass);
    fieldElement.classList.remove(this._config.inputErrorClass);
  }

  _enableSubmintButton() {
    this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
    this._submitButtonElement.disabled = false;
  }

  _disableSubmintButton() {
    this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
    this._submitButtonElement.disabled = true;
  }
}
