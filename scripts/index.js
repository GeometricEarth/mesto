const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__user-name');
const userOccupation = profile.querySelector('.profile__occupation');
const editProfileButton = profile.querySelector('.button_type_edit');

const profileModal = document.querySelector('.popup_type_edit-profile');
const profileModalCloseButton =
  profileModal.querySelector('.button_type_close');
const profileModalForm = document.forms.profileModalForm;
const userOccupationModalFild = profileModalForm.userOccupation;
const userNameModalFild = profileModalForm.userName;

const templateCard = document.querySelector('#templateCard').content;
const galleryContainer = document.querySelector('.gallery__card-list');

const enlargedImagePopup = document.querySelector('.popup_type_image-scaling');
const closeEnlargedImagePopupButton =
  enlargedImagePopup.querySelector('.button_type_close');

const newPlacePopup = document.querySelector('.popup_type_add-place');
const newPlaceForm = document.forms.newPlaceForm;
const showNewPlacePopupButton = profile.querySelector('.button_type_add');
const closeNewPlacePopupButton =
  newPlacePopup.querySelector('.button_type_close');
const placeNameField = newPlaceForm.placeName;
const placeImageField = newPlaceForm.placeImage;

editProfileButton.addEventListener('click', showEditProfileModal);
profileModalForm.addEventListener('submit', editProfile);
profileModalCloseButton.addEventListener('click', () => {
  togglePopUp(profileModal);
});

showNewPlacePopupButton.addEventListener('click', () =>
  togglePopUp(newPlacePopup)
);
closeNewPlacePopupButton.addEventListener('click', () =>
  togglePopUp(newPlacePopup)
);
newPlaceForm.addEventListener('submit', addNewPlace);

closeEnlargedImagePopupButton.addEventListener('click', () =>
  togglePopUp(enlargedImagePopup)
);

function togglePopUp(element) {
  element.classList.toggle('popup_opened');
}

function showEditProfileModal(event) {
  event.preventDefault();
  userOccupationModalFild.value = userOccupation.textContent;
  userNameModalFild.value = userName.textContent;
  togglePopUp(profileModal);
}

function editProfile(event) {
  event.preventDefault();
  userName.textContent = userNameModalFild.value;
  userOccupation.textContent = userOccupationModalFild.value;
  togglePopUp(profileModal);
}

function renderDefaultCards(elementsArray) {
  initialCards.forEach((item) => addCard(item));
}

function addCard(item) {
  const cardElement = templateCard.cloneNode(true);
  cardElement.querySelector('.card__image').setAttribute('src', item.link);
  cardElement.querySelector('.card__image').setAttribute('alt', item.name);
  cardElement.querySelector('.card__title').innerText = item.name;
  cardElement
    .querySelector('.button_type_delite')
    .addEventListener('click', (pointer) => {
      pointer.target.parentNode.remove();
    });
  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', (pointer) => {
      pointer.target.classList.toggle('card__like-button_active');
    });
  cardElement
    .querySelector('.card__image')
    .addEventListener('click', () => showEnlargedImagePopup(item));
  galleryContainer.prepend(cardElement);
}

function showEnlargedImagePopup(item) {
  const enlargedImage = enlargedImagePopup.querySelector(
    '.popup__enlarged-image'
  );
  enlargedImage.setAttribute('src', item.link);
  enlargedImage.setAttribute('alt', item.name);
  enlargedImagePopup.querySelector('.popup__place-title').innerText = item.name;
  togglePopUp(enlargedImagePopup);
}

function addNewPlace(event) {
  event.preventDefault();
  const newPlace = {};
  newPlace.name = placeNameField.value;
  newPlace.link = placeImageField.value;

  addCard(newPlace);

  togglePopUp(newPlacePopup);
}

renderDefaultCards(initialCards);
