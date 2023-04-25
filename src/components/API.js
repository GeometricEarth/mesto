const headers = {
  method: 'GET',
  headers: {
    authorization: '3ad7048e-a39e-4977-8a2a-b13e574881a8',
  },
};
const url = 'https://mesto.nomoreparties.co/v1/cohort-65/users/me';

export function getUserInfo(handle) {
  fetch(url, headers)
    .then((resp) => resp.json())
    .then((data) => handle(data));
}
