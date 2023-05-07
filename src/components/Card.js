export default class Card {
  constructor(
    { name, link, _id, owner, likes, userId },
    selectors,
    handleCardClick,
    handleRemoveCard,
    handleLikeCard,
    handleDeleteLikeFromCard
  ) {
    this._placeName = name;
    this._placeImage = link;
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._userId = userId;

    this._selectors = selectors;

    this._showPopup = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLike = handleDeleteLikeFromCard;
    this._isOwner = this._owner._id === this._userId;
    this._isLiked = false;
  }

  _getTemplate() {
    return document
      .querySelector(this._selectors.templateSelector)
      .content.querySelector(this._selectors.cardSelector)
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getTemplate();
    this._buttonDeleteElement = this._element.querySelector(this._selectors.deleteButtonSelector);
    this._likesCountElement = this._element.querySelector(this._selectors.likeCountSelector);
    this._buttonLikeElement = this._element.querySelector(this._selectors.likeButtonSelector);
    const cardImageElement = this._element.querySelector(this._selectors.imageSelector);

    cardImageElement.alt = this._placeName;
    cardImageElement.src = this._placeImage;

    if (!this._isOwner) {
      this._buttonDeleteElement.classList.add(this._selectors.deleteButtonHiddenClass);
    }

    this._element.querySelector(this._selectors.titleSelector).innerText = this._placeName;

    if (!!this._likes && Object.keys(this._likes !== 0)) {
      this._likesCountElement.innerText = this._likes.length;
      this._isLiked = this._likes.some((person) => {
        return person._id === this._userId;
      });
      if (this._isLiked) {
        this._buttonLikeElement.classList.add(this._selectors.likeButtonActiveClass);
      }
    }

    this._setEventListeners(cardImageElement);

    return this._element;
  }

  setLike(likesList) {
    this._isLiked = true;
    this._buttonLikeElement.classList.add(this._selectors.likeButtonActiveClass);
    this._likesCountElement.innerText = likesList.length;
    this._likes = likesList;
  }

  deleteLike(likesList) {
    this._isLiked = false;
    this._buttonLikeElement.classList.remove(this._selectors.likeButtonActiveClass);
    this._likesCountElement.innerText = likesList.length;
    this._likes = likesList;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(cardImageElement) {
    if (this._isOwner) {
      this._buttonDeleteElement.addEventListener('click', (evt) => {
        this._handleRemoveCard();
      });
    }
    this._buttonLikeElement.addEventListener('click', (event) => {
      this._isLiked ? this._handleDeleteLike(this._id) : this._handleLikeCard(this._id);
    });
    cardImageElement.addEventListener('click', () => {
      this._showPopup(this._placeName, this._placeImage);
    });
  }
}
