import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonLabels) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._element.querySelector('.popup__form');
    this._fieldList = this._formElement.querySelectorAll('.popup__field');
    this._submitButton = this._element.querySelector('.button_type_submit');
    this._buttonLabelsList = buttonLabels;
  }

  _getInputValues() {
    const formData = {};
    this._fieldList.forEach((element) => {
      formData[element.name] = element.value;
    });

    return formData;
  }

  waitingForResponse(isLoading) {
    isLoading
      ? (this._submitButton.innerText = this._buttonLabelsList.waitingState)
      : (this._submitButton.innerText = this._buttonLabelsList.defaultState);
  }

  setInputValues(data) {
    Object.keys(data).forEach((element) => {
      this._formElement.elements[element].value = data[element];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
