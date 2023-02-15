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

let editButton = document.querySelector(".button_type_edit");
let submitButton = document.querySelector(".button_type_submit");
let closeButton = document.querySelector(".button_type_close");
let popUp = document.querySelector(".popup");
let avatar = document.querySelector(".profile__avatar");
let userName = document.querySelector(".profile__user-name");
let userOccupation = document.querySelector(".profile__occupation");
let fildUserName = document.querySelector(".fild_user-name");
let fildOccupation = document.querySelector(".fild_occupation");

editButton.addEventListener("click", (event) => {
  event.preventDefault();
  fildOccupation.value = user.occupation;
  fildUserName.value = user.name;
  togglePoUp(popUp);
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  user.name = fildUserName.value;
  user.occupation = fildOccupation.value;
  togglePoUp(popUp);
});

closeButton.addEventListener("click", (event) => {
  event.preventDefault();
  togglePoUp(popUp);
});

function mount() {
  avatar.setAttribute("src", user.avatar);
  userName.insertAdjacentText("beforeend", user.name);
  userOccupation.insertAdjacentText("beforeend", user.occupation);
}

function togglePoUp(element) {
  element.classList.toggle("popup_opened");
}
