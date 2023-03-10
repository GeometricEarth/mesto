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
