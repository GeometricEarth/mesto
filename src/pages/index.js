import './index.css';
import { initialCards } from '../utils/defaultsCards.js';
import {
  validationConfig,
  userNameSelector,
  userOccupationSelector,
  gallerySelector,
  profilePopupSelector,
  newPlacePopupSelector,
  popupWithImageSelector,
  cardTemplateSelector,
  buttonOpenProfilePopupSelector,
  buttonOpenNewPlacePopupSelector,
} from '../utils/constants.js';

import { getUserInfo } from '../components/API.js';

import UserInfo from '../components/UserInfo';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { data } from 'browserslist';

const buttonEditingProfile = document.querySelector(buttonOpenProfilePopupSelector);
const buttonShowNewPlacePopup = document.querySelector(buttonOpenNewPlacePopupSelector);

const profilePopuplForm = document.forms.profileModalForm;
const newPlaceForm = document.forms.newPlaceForm;

const userInfo = new UserInfo(userNameSelector, userOccupationSelector);

const profilePopuplFormValidate = new FormValidator(validationConfig, profilePopuplForm);
const newPlaceFormValidate = new FormValidator(validationConfig, newPlaceForm);
profilePopuplFormValidate.enableValidation();
newPlaceFormValidate.enableValidation();

const profilePopup = new PopupWithForm(profilePopupSelector, (data) => {
  userInfo.setUserInfo(data);
  profilePopup.close();
});

const newPlacePopup = new PopupWithForm(newPlacePopupSelector, (data) => {
  renderCard(data);
  newPlacePopup.close();
});
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();
newPlacePopup.setEventListeners();
profilePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      renderCard(data);
    },
  },
  gallerySelector
);

cardList.renderItems();

function handleCardClick(placeName, placeImage) {
  popupWithImage.open(placeName, placeImage);
}

function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cardList.addItem(card.createCard());
}

buttonEditingProfile.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  getUserInfo();

  profilePopup.open();
});

buttonShowNewPlacePopup.addEventListener('click', () => {
  newPlaceFormValidate.checkSubmitButtonState();
  newPlacePopup.open();
});
getUserInfo(userInfo.setUserInfo);
