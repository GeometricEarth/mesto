export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector('.button_type_close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  open() {
    this._element.classList.add('popup_opened');
  }

  close() {
    this._element.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      const targegClassList = evt.target.classList;
      if (targegClassList.contains('popup')) this.close();
    });
    this._closeButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
