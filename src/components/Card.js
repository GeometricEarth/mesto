export default class Card {
<<<<<<< HEAD
  constructor(data, templateSelector, handleCardClick) {
    this._placeName = data.placeName;
    this._placeImage = data.placeImage;
    this._showPopup = handleCardClick;
    this._templateSelecotr = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelecotr).content.cloneNode(true);
=======
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
    this._templateSelector = templateSelector;
    this._likeCountSelector = likeCountSelector;
    this._userId = userId;
    this._isOwner = this._owner._id === this._userId;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
>>>>>>> develop
  }

  createCard() {
    this._element = this._getTemplate();
<<<<<<< HEAD
    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.alt = this._placeName;
    cardImageElement.src = this._placeImage;
=======
    this._buttonDelete = this._element.querySelector('.button_type_delite');

    const cardImageElement = this._element.querySelector('.card__image');
    cardImageElement.alt = this._placeName;
    cardImageElement.src = this._placeImage;
    if (!this._isOwner) {
      this._buttonDelete.classList.add('button_hidden');
    }
>>>>>>> develop

    this._element.querySelector('.card__title').innerText = this._placeName;

    this._setEventListeners(cardImageElement);

<<<<<<< HEAD
    return this._element;
  }

  _setEventListeners(cardImageElement) {
    const buttonDelite = this._element.querySelector('.button_type_delite');
    const buttonLike = this._element.querySelector('.card__like-button');

    buttonDelite.addEventListener('click', this._handleRemoveCard);
    buttonLike.addEventListener('click', this._handleLikeCard);
=======
    this._likesCountElement = this._element.querySelector(this._likeCountSelector);

    this._likesCountElement.innerText = this._likes.length;

    return this._element;
  }

  setLike(likesList) {
    this._buttonLikeElement.classList.add('card__like-button_active');
    this._likesCountElement.innerText = likesList.length;
    this._likes = likesList;
  }

  deleteLike(likesList) {
    this._buttonLikeElement.classList.remove('card__like-button_active');
    this._likesCountElement.innerText = likesList.length;
    this._likes = likesList;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(cardImageElement) {
    if (this._isOwner) {
      this._buttonDelete.addEventListener('click', (evt) => {
        this._handleRemoveCard();
      });
    }
    this._buttonLikeElement = this._element.querySelector('.card__like-button');
    this._buttonLikeElement.addEventListener('click', (event) => {
      const isLikeSet = this._likes.some((element) => element._id === this._userId);
      isLikeSet ? this._handleDeleteLike(this._id) : this._handleLikeCard(this._id);
    });
>>>>>>> develop
    cardImageElement.addEventListener('click', () => {
      this._showPopup(this._placeName, this._placeImage);
    });
  }
<<<<<<< HEAD

  _handleRemoveCard(event) {
    event.target.closest('.card').remove();
  }

  _handleLikeCard(event) {
    event.target.classList.toggle('card__like-button_active');
  }
=======
>>>>>>> develop
}
