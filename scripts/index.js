const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userOccupation = profile.querySelector('.profile__occupation');
const buttonEditingProfile = profile.querySelector('.button_type_edit');

const profilePopup = document.querySelector('.popup_type_edit-profile');
const buttonCloseProfileModal =
  profilePopup.querySelector('.button_type_close');
const profileModalForm = document.forms.profileModalForm;
const userOccupationModalFild = profileModalForm.userOccupation;
const userNameModalFild = profileModalForm.userName;

const templateCard = document.querySelector('#templateCard').content;
const galleryContainer = document.querySelector('.gallery__card-list');

const enlargedImagePopup = document.querySelector('.popup_type_image-scaling');
const buttonCloseEnlargedImagePopup =
  enlargedImagePopup.querySelector('.button_type_close');
const enlargedImage = enlargedImagePopup.querySelector(
  '.popup__enlarged-image'
);

const newPlacePopup = document.querySelector('.popup_type_add-place');
const buttonCloseNewPlacePopup =
  newPlacePopup.querySelector('.button_type_close');
const newPlaceForm = document.forms.newPlaceForm;
const buttonShowNewPlacePopup = profile.querySelector('.button_type_add');
const placeNameField = newPlaceForm.placeName;
const placeImageField = newPlaceForm.placeImage;

function handleShowEditProfileModal(event) {
  event.preventDefault();
  userOccupationModalFild.value = userOccupation.textContent;
  userNameModalFild.value = userName.textContent;
  openPopup(profilePopup);
}

function handleSaveNewProfileData(event) {
  event.preventDefault();
  userName.textContent = userNameModalFild.value;
  userOccupation.textContent = userOccupationModalFild.value;
  closePopup(profilePopup);
}

function renderDefaultCards(elementsArray) {
  initialCards.forEach((item) => renderCard(item));
}

function renderCard(item) {
  const card = createCard(item);
  galleryContainer.prepend(card);
}

function createCard(item) {
  const cardElement = templateCard.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.setAttribute('alt', item.name);
  cardImage.setAttribute('src', item.link);

  cardElement.querySelector('.card__title').innerText = item.name;

  cardElement
    .querySelector('.button_type_delite')
    .addEventListener('click', handleRemoveCard);

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', handleLikeCard);

  cardElement
    .querySelector('.card__image')
    .addEventListener('click', () => showEnlargedImagePopup(item));
  return cardElement;
}

function showEnlargedImagePopup(item) {
  enlargedImage.setAttribute('src', item.link);
  enlargedImage.setAttribute('alt', item.name);
  enlargedImagePopup.querySelector('.popup__place-title').innerText = item.name;
  openPopup(enlargedImagePopup);
}

function handleAddPlace(event) {
  event.preventDefault();
  const newPlace = {};
  newPlace.name = placeNameField.value;
  newPlace.link = placeImageField.value;

  renderCard(newPlace);

  closePopup(newPlacePopup);
}

function handleRemoveCard(event) {
  event.target.closest('.card').remove();
}

function handleLikeCard(event) {
  event.target.classList.toggle('card__like-button_active');
}

function openPopup(element) {
  element.classList.add('popup_opened');
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

renderDefaultCards(initialCards);

buttonCloseProfileModal.addEventListener('click', () =>
  closePopup(profilePopup)
);
buttonCloseNewPlacePopup.addEventListener('click', () =>
  closePopup(newPlacePopup)
);
buttonCloseEnlargedImagePopup.addEventListener('click', () =>
  closePopup(enlargedImagePopup)
);

buttonEditingProfile.addEventListener('click', handleShowEditProfileModal);
profileModalForm.addEventListener('submit', handleSaveNewProfileData);

buttonShowNewPlacePopup.addEventListener('click', () =>
  openPopup(newPlacePopup)
);
newPlaceForm.addEventListener('submit', handleAddPlace);
