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

  setUserInfo({ userName, userOccupation }) {
    this._nameElement.textContent = userName;
    this._occupationElement.textContent = userOccupation;
  }
}
