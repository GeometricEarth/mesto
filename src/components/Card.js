export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._placeName = data.placeName;
    this._placeImage = data.placeImage;
    this._showPopup = handleCardClick;
    this._templateSelecotr = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelecotr).content.cloneNode(true);
  }

  createCard(item) {
    this._element = this._getTemplate();
    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.alt = this._placeName;
    cardImageElement.src = this._placeImage;

    this._element.querySelector('.card__title').innerText = this._placeName;

    this._setEventListeners(cardImageElement);

    return this._element;
  }

  _setEventListeners(cardImageElement) {
    const buttonDelite = this._element.querySelector('.button_type_delite');
    const buttonLike = this._element.querySelector('.card__like-button');

    buttonDelite.addEventListener('click', this._handleRemoveCard);
    buttonLike.addEventListener('click', this._handleLikeCard);
    cardImageElement.addEventListener('click', () => {
      this._showPopup(this._placeName, this._placeImage);
    });
  }

  _handleRemoveCard(event) {
    event.target.closest('.card').remove();
  }

  _handleLikeCard(event) {
    event.target.classList.toggle('card__like-button_active');
  }
}
