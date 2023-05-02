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
  likeCountSelector,
  popupAvatarEdetingSelector,
  avatarOverlaySelector,
} from '../utils/constants.js';

import API from '../components/API.js';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirmation';

const buttonEditingProfile = document.querySelector(buttonOpenProfilePopupSelector);
const buttonShowNewPlacePopup = document.querySelector(buttonOpenNewPlacePopupSelector);
const avatarOverlay = document.querySelector(avatarOverlaySelector);

const profilePopuplForm = document.forms.profileModalForm;
const newPlaceForm = document.forms.newPlaceForm;
const avatarLinkForm = document.forms.avatarEdetingForm;

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
const avatarLinkFormValidate = new FormValidator(validationConfig, avatarEdetingForm);
profilePopupFormValidate.enableValidation();
newPlaceFormValidate.enableValidation();
avatarLinkFormValidate.enableValidation();

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

const popupAvatarEdeting = new PopupWithForm(
  popupAvatarEdetingSelector,
  async (avatar) => {
    try {
      const respData = await api.updateUserAvatar(avatar);
      userInfo.setUserAvatar(respData);
    } catch (error) {
      errorHandler('Ощибка обновления аватара пользователя', error);
    } finally {
      this.close();
      avatarLinkFormValidate.resetValidation(false);
    }
  },
  () => {}
);

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const popupWidthconfirm = new PopupWithConfirm(buttonConfirmSelector);

popupWithImage.setEventListeners();
newPlacePopup.setEventListeners();
profilePopup.setEventListeners();
popupAvatarEdeting.setEventListeners();

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

async function handleRemoveCard(id, event) {
  try {
    await popupWidthconfirm.open();
    await api.deleteCard(id);
    event.target.closest('.card').remove();
  } catch (error) {
    console.warn(error);
  }
}

function renderCard(data) {
  const userData = userInfo.getUserInfo();
  data.userId = userData.userId;

  const card = new Card(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleRemoveCard,
    handleLikeCard,
    handleDeleteLikeFromCard,
    likeCountSelector
  );
  cardList.addItem(card.createCard());
}

async function handleLikeCard(id) {
  try {
    const respData = await api.likeCard(id);
    this.setLike(respData.likes);
  } catch (error) {
    errorHandler('Ошибка при добавлении лайка', error);
  }
}

async function handleDeleteLikeFromCard(id) {
  try {
    const respData = await api.deleteLikeFromCard(id);
    this.deleteLike(respData.likes);
  } catch (error) {
    errorHandler('Ошибка при удалении лайка', error);
  }
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

avatarOverlay.addEventListener('click', () => {
  popupAvatarEdeting.open();
});

function errorHandler(massege, error) {
  console.error(`${massege} ${error}`);
}
