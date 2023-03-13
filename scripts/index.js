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

const profileModal = document.querySelector('.popup');
const profileModalCloseButton =
  profileModal.querySelector('.button_type_close');
const profileModalForm = document.forms.profileModalForm;
const userOccupationModalFild = profileModalForm.userOccupation;
const userNameModalFild = profileModalForm.userName;

const templateCard = document.querySelector('#templateCard').content;
const galleryContainer = document.querySelector('.gallery__card-list');

editProfileButton.addEventListener('click', showEditProfileModal);
profileModalForm.addEventListener('submit', editProfile);
profileModalCloseButton.addEventListener('click', () => {
  togglePopUp(profileModal);
});

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
  cardElement.querySelector('.card__title').innerText = item.name;
  galleryContainer.prepend(cardElement);
}

renderDefaultCards(initialCards);
