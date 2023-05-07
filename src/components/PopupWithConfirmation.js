import Popup from './Popup';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._element.querySelector('.button_type_confirm');
    this.setEventListeners();
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => this._handleFormSubmit());
  }
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
