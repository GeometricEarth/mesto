import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._enlargedImageElement = this._element.querySelector('.popup__enlarged-image');
    this._placeNameElement = this._element.querySelector('.popup__place-title');
  }

  open(placeName, placeImage) {
    this._enlargedImageElement.setAttribute('src', placeImage);
    this._enlargedImageElement.setAttribute('alt', placeName);
    this._placeNameElement.innerText = placeName;
    super.open();
  }
}
