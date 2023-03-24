const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userOccupation = profile.querySelector('.profile__occupation');
const buttonEditingProfile = profile.querySelector('.button_type_edit');

const popupList = document.querySelectorAll('.popup');
const buttonsClosePopupList = document.querySelectorAll('.button_type_close');

const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileModalForm = document.forms.profileModalForm;
const userOccupationModalFild = profileModalForm.userOccupation;
const userNameModalFild = profileModalForm.userName;

const templateCard = document.querySelector('#templateCard').content;
const galleryContainer = document.querySelector('.gallery__card-list');

const enlargedImagePopup = document.querySelector('.popup_type_image-scaling');
const enlargedImage = enlargedImagePopup.querySelector('.popup__enlarged-image');

const newPlacePopup = document.querySelector('.popup_type_add-place');
const newPlaceForm = document.forms.newPlaceForm;
const newPlaseFieldList = newPlaceForm.querySelectorAll('.popup__field');
const buttonShowNewPlacePopup = profile.querySelector('.button_type_add');

function handleShowEditProfileModal(event) {
  event.preventDefault();
  userOccupationModalFild.value = userOccupation.textContent;
  userNameModalFild.value = userName.textContent;
  resetValidation(profileModalForm.name, true);
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
  cardImage.setAttribute('alt', item.placeName);
  cardImage.setAttribute('src', item.placeImage);

  cardElement.querySelector('.card__title').innerText = item.placeName;

  cardElement.querySelector('.button_type_delite').addEventListener('click', handleRemoveCard);

  cardElement.querySelector('.card__like-button').addEventListener('click', handleLikeCard);

  cardElement
    .querySelector('.card__image')
    .addEventListener('click', () => showEnlargedImagePopup(item));
  return cardElement;
}

function showEnlargedImagePopup(item) {
  enlargedImage.setAttribute('src', item.placeImage);
  enlargedImage.setAttribute('alt', item.placeName);
  enlargedImagePopup.querySelector('.popup__place-title').innerText = item.placeName;
  openPopup(enlargedImagePopup);
}

function handleAddPlace(event) {
  event.preventDefault();
  const newPlace = {};
  newPlaseFieldList.forEach((item) => {
    newPlace[item.name] = item.value;
  });
  renderCard(newPlace);

  closePopup(newPlacePopup);
  newPlaceForm.reset();
  // resetValidation(newPlaceForm.name, false);
}

function handleRemoveCard(event) {
  event.target.closest('.card').remove();
}

function handleLikeCard(event) {
  event.target.classList.toggle('card__like-button_active');
}

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKeyListener);
}

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKeyListener);
}

function handleEscapeKeyListener(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

renderDefaultCards(initialCards);

popupList.forEach((element) => {
  element.addEventListener('click', (event) => {
    const targegClassList = event.target.classList;
    if (targegClassList.contains('popup')) closePopup(element);
  });
});

buttonsClosePopupList.forEach((button) => {
  const targetPopup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(targetPopup);
  });
});

buttonEditingProfile.addEventListener('click', handleShowEditProfileModal);
profileModalForm.addEventListener('submit', handleSaveNewProfileData);

buttonShowNewPlacePopup.addEventListener('click', () => {
  checkSubmitButtonState(newPlaceForm.name, validationConfig.inactiveButtonClass);
  openPopup(newPlacePopup);
});
newPlaceForm.addEventListener('submit', handleAddPlace);
