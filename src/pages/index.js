import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import { initialCards } from '../utils/defaultsCards.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../utils/validationConfig.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userOccupation = profile.querySelector('.profile__occupation');
const buttonEditingProfile = profile.querySelector('.button_type_edit');

const galleryContainer = document.querySelector('.gallery__card-list');

const profilePopuplForm = document.forms.profileModalForm;
const userOccupationModalFild = profilePopuplForm.userOccupation;
const userNameModalFild = profilePopuplForm.userName;

const newPlaceForm = document.forms.newPlaceForm;
const buttonShowNewPlacePopup = profile.querySelector('.button_type_add');

const profilePopuplFormValidate = new FormValidator(validationConfig, profilePopuplForm);
const newPlaceFormValidate = new FormValidator(validationConfig, newPlaceForm);
profilePopuplFormValidate.enableValidation();
newPlaceFormValidate.enableValidation();

const profilePopup = new PopupWithForm('.popup_type_edit-profile', (data) => {});
const newPlacePopup = new PopupWithForm('.popup_type_add-place', (data) => {
  renderCard(data);
  newPlacePopup.close();
});
const popupWithImage = new PopupWithImage('.popup_type_image-scaling');
popupWithImage.setEventListeners();
newPlacePopup.setEventListeners();

function handleShowEditProfileModal(event) {
  event.preventDefault();
  userOccupationModalFild.value = userOccupation.textContent;
  userNameModalFild.value = userName.textContent;
  profilePopuplFormValidate.resetValidation(true);
  // openPopup(profilePopup);
}

function handleSaveNewProfileData(data) {
  userName.textContent = userNameModalFild.value;
  userOccupation.textContent = userOccupationModalFild.value;
  // closePopup(profilePopup);
}

function handleCardClick(placeName, placeImage) {
  popupWithImage.open(placeName, placeImage);
}

function renderDefaultCards(elementsArray) {
  initialCards.forEach((data) => renderCard(data));
}

function renderCard(data) {
  const card = new Card(data, '#templateCard', handleCardClick);
  galleryContainer.prepend(card.createCard());
}

renderDefaultCards(initialCards);

buttonEditingProfile.addEventListener('click', handleShowEditProfileModal);

buttonShowNewPlacePopup.addEventListener('click', () => {
  newPlaceFormValidate.checkSubmitButtonState();
  newPlacePopup.open();
});
