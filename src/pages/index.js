import './index.css';
import {
  validationConfig,
  profileSelectors,
  gallerySelector,
  profilePopupSelector,
  newPlacePopupSelector,
  popupWithImageSelector,
  cardTemplateSelector,
  buttonOpenProfilePopupSelector,
  buttonOpenNewPlacePopupSelector,
  buttonConfirmSelector,
} from '../utils/constants.js';

import API from '../components/API.js';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

const buttonEditingProfile = document.querySelector(buttonOpenProfilePopupSelector);
const buttonShowNewPlacePopup = document.querySelector(buttonOpenNewPlacePopupSelector);

const profilePopuplForm = document.forms.profileModalForm;
const newPlaceForm = document.forms.newPlaceForm;

const api = new API(
  'https://mesto.nomoreparties.co/v1/cohort-65/',
  '3ad7048e-a39e-4977-8a2a-b13e574881a8'
);

const userInfo = new UserInfo(profileSelectors);
getUserInfo();

async function getUserInfo() {
  try {
    const userData = await api.getUserInfo();
    userInfo.updateUserInfo(userData);
  } catch (error) {
    errorHandler('Ошибка обнавления профиля пользователя. Сервер ответил:', error);
  }
}

const profilePopupFormValidate = new FormValidator(validationConfig, profilePopuplForm);
const newPlaceFormValidate = new FormValidator(validationConfig, newPlaceForm);
profilePopupFormValidate.enableValidation();
newPlaceFormValidate.enableValidation();

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  async (data) => {
    try {
      const userData = await api.patchUserInfo(data);
      userInfo.setUserInfo(userData);
    } catch (error) {
      errorHandler('Ошибка обнавления профиля пользователя. Сервер ответил:', error);
    }
    profilePopupFormValidate.resetValidation(true);
    profilePopup.close();
  },
  () => profilePopupFormValidate.resetValidation(true)
);

const newPlacePopup = new PopupWithForm(
  newPlacePopupSelector,
  (data) => {
    api
      .addCard(data)
      .then((resData) => {
        renderCard(resData);
      })
      .catch((error) => {
        console.error(`Ошибка: ${error}`);
      })
      .finally(() => {
        newPlacePopup.close();
      });
  },
  () => newPlaceFormValidate.resetValidation(false)
);
const popupWithImage = new PopupWithImage(popupWithImageSelector);

const popupWidthconfirm = new PopupWithConfirm(buttonConfirmSelector);

popupWithImage.setEventListeners();
newPlacePopup.setEventListeners();
profilePopup.setEventListeners();

const cardList = new Section(gallerySelector, (data) => {
  renderCard(data);
});

(async function getCards() {
  try {
    const cards = await api.getCards();
    cardList.renderItems(cards);
  } catch (error) {
    errorHandler('Ошибка загрузки списка карточек. Сервер ответил:', error);
  }
})();

function handleCardClick(placeName, placeImage) {
  popupWithImage.open(placeName, placeImage);
}

function handleRemoveCard(id, event) {
  popupWidthconfirm
    .open()
    .then(() => {
      api
        .deleteCard(id)
        .then(() => {
          event.target.closest('.card').remove();
        })
        .catch((error) => {
          errorHandler('Ошибка удаления карточки. Ответ сервера:', error);
        });
    })
    .catch(() => {});
}

function renderCard(data) {
  const userData = userInfo.getUserInfo();
  userData.userId === data.owner._id ? (data.isOwner = true) : (data.isOwner = false);

  const card = new Card(data, cardTemplateSelector, handleCardClick, handleRemoveCard);
  cardList.addItem(card.createCard());
}

buttonEditingProfile.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  profilePopup.setInputValues({ name, about });

  profilePopup.open();
});

buttonShowNewPlacePopup.addEventListener('click', () => {
  newPlaceFormValidate.checkSubmitButtonState();
  newPlacePopup.open();
});

function errorHandler(massege, error) {
  console.error(`${massege} ${error}`);
}
