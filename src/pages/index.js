import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/defaultsCards.js';
import { validationConfig } from '../utils/validationConfig.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userOccupation = profile.querySelector('.profile__occupation');
const buttonEditingProfile = profile.querySelector('.button_type_edit');

const popupList = document.querySelectorAll('.popup');
const buttonsClosePopupList = document.querySelectorAll('.button_type_close');

const profilePopup = document.querySelector('.popup_type_edit-profile');
const profilePopuplForm = document.forms.profileModalForm;
const userOccupationModalFild = profilePopuplForm.userOccupation;
const userNameModalFild = profilePopuplForm.userName;

const galleryContainer = document.querySelector('.gallery__card-list');

const newPlacePopup = document.querySelector('.popup_type_add-place');
const newPlaceForm = document.forms.newPlaceForm;
const newPlaseFieldList = newPlaceForm.querySelectorAll('.popup__field');
const buttonShowNewPlacePopup = profile.querySelector('.button_type_add');

const profilePopuplFormValidate = new FormValidator(validationConfig, profilePopuplForm);
const newPlaceFormValidate = new FormValidator(validationConfig, newPlaceForm);
profilePopuplFormValidate.enableValidation();
newPlaceFormValidate.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image-scaling');
popupWithImage.setEventListeners();

function handleShowEditProfileModal(event) {
  event.preventDefault();
  userOccupationModalFild.value = userOccupation.textContent;
  userNameModalFild.value = userName.textContent;
  profilePopuplFormValidate.resetValidation(true);
  openPopup(profilePopup);
}

function handleSaveNewProfileData(event) {
  event.preventDefault();
  userName.textContent = userNameModalFild.value;
  userOccupation.textContent = userOccupationModalFild.value;
  closePopup(profilePopup);
}

function handleCardClick(placeName, placeImage) {
  popupWithImage.open(placeName, placeImage);
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

// function closePopup(element) {
//   element.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleEscapeKeyListener);
// }

function handleEscapeKeyListener(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function renderDefaultCards(elementsArray) {
  initialCards.forEach((data) => renderCard(data));
}

function renderCard(data) {
  const card = new Card(data, '#templateCard', handleCardClick);
  galleryContainer.prepend(card.createCard());
}

renderDefaultCards(initialCards);

//назначения обработчиков клика за пределы формы
// popupList.forEach((element) => {
//   element.addEventListener('click', (event) => {
//     const targegClassList = event.target.classList;
//     if (targegClassList.contains('popup')) closePopup(element);
//   });
// });

//Назначение обработчиков клика по кнопкам закрытия попапов
// buttonsClosePopupList.forEach((button) => {
//   const targetPopup = button.closest('.popup');
//   button.addEventListener('click', () => {
//     closePopup(targetPopup);
//   });
// });

buttonEditingProfile.addEventListener('click', handleShowEditProfileModal);
profilePopuplForm.addEventListener('submit', handleSaveNewProfileData);

buttonShowNewPlacePopup.addEventListener('click', () => {
  newPlaceFormValidate.checkSubmitButtonState();
  openPopup(newPlacePopup);
});

newPlaceForm.addEventListener('submit', handleAddPlace);
