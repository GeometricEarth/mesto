export default class UserInfo {
  constructor(nameSelector, occupationSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
  }

  getUserInfo() {
    const state = {
      userName: this._nameElement.textContent,
      userOccupation: this._occupationElement.textContent,
    };

    return state;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._occupationElement.textContent = about;
  }
}
