export default class Card {
  constructor(
    { name, link, _id, owner, likes, isOwner },
    templateSelector,
    handleCardClick,
    handleRemoveCard
  ) {
    this._placeName = name;
    this._placeImage = link;
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._showPopup = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._templateSelecotr = templateSelector;
    this._isOwner = isOwner;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelecotr).content.cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector('.button_type_delite');

    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.alt = this._placeName;
    cardImageElement.src = this._placeImage;
    if (!this._isOwner) {
      this._buttonDelete.classList.add('button_hidden');
    }

    this._element.querySelector('.card__title').innerText = this._placeName;

    this._setEventListeners(cardImageElement);

    return this._element;
  }

  _setEventListeners(cardImageElement) {
    const buttonLike = this._element.querySelector('.card__like-button');
    if (this._isOwner) {
      this._buttonDelete.addEventListener('click', (evt) => {
        this._handleRemoveCard(this._id, evt);
      });
    }
    buttonLike.addEventListener('click', this._handleLikeCard);
    cardImageElement.addEventListener('click', () => {
      this._showPopup(this._placeName, this._placeImage);
    });
  }

  _handleLikeCard(event) {
    event.target.classList.toggle('card__like-button_active');
  }
}
