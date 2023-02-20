const user = {
  _name: "Жак-Ив Кусто",
  _occupation: "Исследователь океана",
  avatar: "./images/profile__avatar.jpg",
  /**
   * @param {string} value
   */
  set name(value) {
    this._name = value;
    userName.textContent = value;
  },
  get name() {
    return this._name;
  },
  /**
   * @param {string} value
   */
  set occupation(value) {
    this._occupation = value;
    userOccupation.textContent = value;
  },
  get occupation() {
    return this._occupation;
  },
};

document.addEventListener("DOMContentLoaded", mount);

const profile = document.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userOccupation = profile.querySelector(".profile__occupation");
const avatar = profile.querySelector(".profile__avatar");
const editButton = profile.querySelector(".button_type_edit");

const likeButtonsCollection = document.querySelectorAll(".card__like-button"); //static collection NodeList

const popUp = document.querySelector(".popup");
const popUpForm = popUp.querySelector(".popup__container");
const submitButton = popUpForm.querySelector(".button_type_submit");
const closeButton = popUpForm.querySelector(".button_type_close");
const formInputsCollection = popUpForm.elements;

editButton.addEventListener("click", (event) => {
  event.preventDefault();
  formInputsCollection.userOccupation.value = user.occupation;
  formInputsCollection.userName.value = user.name;
  togglePopUp(popUp);
});

popUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  user.name = formInputsCollection.userName.value;
  user.occupation = formInputsCollection.userOccupation.value;
  togglePopUp(popUp);
});

closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  togglePopUp(popUp);
});

/**Прототип отображения лайков в глаерее.
 *Тут мы обрабатываем статический NodeList.
 *при динамическом добавлении элементов это вызвет проблемы.
 * @todo заменить при динамическом добавлении элементов
 */
likeButtonsCollection.forEach((element) => {
  element.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.classList.toggle("card__like-button_active");
  });
});

function mount() {
  avatar.setAttribute("src", user.avatar);
  userName.insertAdjacentText("beforeend", user.name);
  userOccupation.insertAdjacentText("beforeend", user.occupation);
}

function togglePopUp(element) {
  element.classList.toggle("popup_opened");
}
