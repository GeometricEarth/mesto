export default class UserInfo {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._occupationElement = document.querySelector(occupationSelector);
    this._userAvatarElement = document.querySelector(avatarSelector);
    this._userName;
    this._userOccupation;
    this._userAvatar;
    this._userId;
  }

  getUserInfo() {
    return {
      userId: this._userId,
      name: this._userName,
      about: this._userOccupation,
      avatar: this._userAvatar,
    };
  }

  setUserInfo({ name, about }) {
    this._userName = name;
    this._userOccupation = about;

    this._renderUserInfo();
  }

  setUserAvatar({ avatar }) {
    this._userAvatar = avatar;

    this._renderUserInfo();
  }

  updateUserInfo(userData) {
    this._userName = userData.name;
    this._userOccupation = userData.about;
    this._userAvatar = userData.avatar;
    this._userId = userData._id;

    this._renderUserInfo();
  }

  _renderUserInfo() {
    this._nameElement.textContent = this._userName;
    this._occupationElement.textContent = this._userOccupation;
    this._userAvatarElement.src = this._userAvatar;
  }
}
