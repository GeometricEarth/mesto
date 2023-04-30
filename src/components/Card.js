export default class Card {
  constructor(
    { name, link, _id, owner, likes, userId },
    templateSelector,
    handleCardClick,
    handleRemoveCard,
    handleLikeCard,
    handleDeleteLikeFromCard,
    likeCountSelector
  ) {
    this._placeName = name;
    this._placeImage = link;
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._showPopup = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLikeFromCard;
    this._templateSelecotr = templateSelector;
    this._likeCountSelector = likeCountSelector;
    this._userId = userId;
    this._isOwner = this._owner._id === this._userId;
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

    this._likesCount = this._element.querySelector(this._likeCountSelector);

    this._likesCount.innerText = this._likes.length;

    return this._element;
  }

  setLike(likesList) {
    this._buttonLike.classList.add('card__like-button_active');
    this._likesCount.innerText = likesList.length;
    this._likes = likesList;
  }

  deleteLike(likesList) {
    this._buttonLike.classList.remove('card__like-button_active');
    this._likesCount.innerText = likesList.length;
    this._likes = likesList;
  }

  _setEventListeners(cardImageElement) {
    if (this._isOwner) {
      this._buttonDelete.addEventListener('click', (evt) => {
        this._handleRemoveCard(this._id, evt);
      });
    }
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonLike.addEventListener('click', (event) => {
      const isLikeSet = this._likes.some((element) => element._id === this._userId);
      isLikeSet ? this._handleDeleteLike(this._id) : this._handleLikeCard(this._id);
    });
    cardImageElement.addEventListener('click', () => {
      this._showPopup(this._placeName, this._placeImage);
    });
  }
}
