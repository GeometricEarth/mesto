import './index.css';
<<<<<<< HEAD
import { initialCards } from '../utils/defaultsCards.js';
import {
  validationConfig,
  userNameSelector,
  userOccupationSelector,
=======
import {
  validationConfig,
  profileSelectors,
>>>>>>> develop
  gallerySelector,
  profilePopupSelector,
  newPlacePopupSelector,
  popupWithImageSelector,
  cardTemplateSelector,
  buttonOpenProfilePopupSelector,
  buttonOpenNewPlacePopupSelector,
<<<<<<< HEAD
} from '../utils/constants.js';

=======
  buttonConfirmSelector,
  likeCountSelector,
  popupAvatarEdetingSelector,
  avatarOverlaySelector,
} from '../utils/constants.js';

import API from '../components/API.js';
>>>>>>> develop
import UserInfo from '../components/UserInfo';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
<<<<<<< HEAD

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
=======
import PopupWithConfirm from '../components/PopupWithConfirmation';

const buttonEditingProfile = document.querySelector(buttonOpenProfilePopupSelector);
const buttonShowNewPlacePopup = document.querySelector(buttonOpenNewPlacePopupSelector);
const avatarOverlay = document.querySelector(avatarOverlaySelector);

const api = new API(
  'https://mesto.nomoreparties.co/v1/cohort-65/',
  '3ad7048e-a39e-4977-8a2a-b13e574881a8'
);

const userInfo = new UserInfo(profileSelectors);

async function loadPageData() {
  try {
    const userData = await api.getUserInfo();
    userInfo.updateUserInfo(userData);
    const cards = await api.getCards();
    cardList.renderItems(cards);
  } catch (error) {
    errorHandler('Ошибка загрузки данных из api: ', error);
  }
}

const profilePopupFormValidate = new FormValidator(validationConfig, profileModalForm);
const newPlaceFormValidate = new FormValidator(validationConfig, newPlaceForm);
const avatarLinkFormValidate = new FormValidator(validationConfig, avatarEdetingForm);
profilePopupFormValidate.enableValidation();
newPlaceFormValidate.enableValidation();
avatarLinkFormValidate.enableValidation();

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  async (data) => {
    try {
      newPlacePopup.waitingForResponse(true);
      const userData = await api.patchUserInfo(data);
      userInfo.setUserInfo(userData);
    } catch (error) {
      errorHandler('Ошибка обнавления профиля пользователя. Сервер ответил:', error);
    } finally {
      profilePopup.close();
      newPlacePopup.waitingForResponse(false);
      profilePopupFormValidate.resetValidation(true);
    }
  },
  { defaultState: 'Сохранить', waitingState: 'Сохранение...' }
);

const newPlacePopup = new PopupWithForm(
  newPlacePopupSelector,
  async (data) => {
    try {
      newPlacePopup.waitingForResponse(true);
      const resData = await api.addCard(data);
      renderCard(resData, false);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    } finally {
      newPlacePopup.close();
      newPlacePopup.waitingForResponse(false);
      newPlaceFormValidate.resetValidation(false);
    }
  },
  { defaultState: 'Создать', waitingState: 'Создание...' }
);

const popupAvatarEdeting = new PopupWithForm(
  popupAvatarEdetingSelector,
  async (avatar) => {
    try {
      newPlacePopup.waitingForResponse(true);
      const respData = await api.updateUserAvatar(avatar);
      userInfo.setUserAvatar(respData);
    } catch (error) {
      errorHandler('Ощибка обновления аватара пользователя', error);
    } finally {
      popupAvatarEdeting.close();
      newPlacePopup.waitingForResponse(false);
      avatarLinkFormValidate.resetValidation(false);
    }
  },
  { defaultState: 'Сохранить', waitingState: 'Сохранение...' }
);

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const popupWithConfirm = new PopupWithConfirm(buttonConfirmSelector);

popupWithImage.setEventListeners();
newPlacePopup.setEventListeners();
profilePopup.setEventListeners();
popupAvatarEdeting.setEventListeners();

const cardList = new Section(gallerySelector, (data) => {
  renderCard(data, true);
});
>>>>>>> develop

function handleCardClick(placeName, placeImage) {
  popupWithImage.open(placeName, placeImage);
}

<<<<<<< HEAD
function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cardList.addItem(card.createCard());
}

buttonEditingProfile.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
=======
async function handleRemoveCard() {
  popupWithConfirm.setSubmitAction(async () => {
    try {
      await api.deleteCard(this._id);
      this.deleteCard();
      popupWithConfirm.close();
    } catch (error) {
      console.error(error);
    }
  });
  popupWithConfirm.open();
}

function renderCard(data, isReverseDirection) {
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
  cardList.addItem(card.createCard(), isReverseDirection);
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

>>>>>>> develop
  profilePopup.open();
});

buttonShowNewPlacePopup.addEventListener('click', () => {
  newPlaceFormValidate.checkSubmitButtonState();
  newPlacePopup.open();
});
<<<<<<< HEAD
=======

avatarOverlay.addEventListener('click', () => {
  popupAvatarEdeting.open();
});

function errorHandler(massege, error) {
  console.error(`${massege} ${error}`);
}

loadPageData();
>>>>>>> develop
