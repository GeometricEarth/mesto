export default class API {
  constructor(baseURL, key) {
    this._baseURL = baseURL;
    this._key = key;
  }

  getUserInfo() {
    return this._sendRequest('GET', 'users/me', {}).then((resp) => {
      return resp.json();
    });
  }

  getCards() {
    return this._sendRequest('GET', 'cards', {}).then((resp) => {
      return resp.json();
    });
  }

  patchUserInfo(data) {
    return this._sendRequest('PATCH', 'users/me', data).then((resp) => {
      return resp.json();
    });
  }

  addCard(data) {
    return this._sendRequest('POST', 'cards', data).then((resp) => {
      return resp.json();
    });
  }

  deleteCard(cardId) {
    return this._sendRequest('DELETE', `cards/${cardId}`, {});
  }

  _sendRequest(method, path, body) {
    const settings = {
      method: method,
      headers: {
        authorization: this._key,
        'content-type': 'application/json',
      },
    };
    if (Object.keys(body).length !== 0) {
      settings.body = JSON.stringify({ ...body });
    }
    return fetch(`${this._baseURL}${path}`, settings).then((resp) => {
      if (!resp.ok) {
        return Promise.reject(resp.statusText);
      }
      return resp;
    });
  }
}
