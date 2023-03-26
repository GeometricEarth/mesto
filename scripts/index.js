import Card from './card.js';

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
  initialCards.forEach((data) => renderCard(data));
}

function renderCard(data) {
  const card = new Card(data, '#templateCard', showEnlargedImagePopup);
  galleryContainer.prepend(card.createCard());
}

function showEnlargedImagePopup(placeName, placeImage) {
  enlargedImage.setAttribute('src', placeImage);
  enlargedImage.setAttribute('alt', placeName);
  enlargedImagePopup.querySelector('.popup__place-title').innerText = placeName;
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
