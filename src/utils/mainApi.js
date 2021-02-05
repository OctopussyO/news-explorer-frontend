import { MAIN_API_BASE_URL } from "../configs/api";

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  getOwnerInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  getOwnerData(token) {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }

  saveItem(token, data) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  deleteItem(token, itemId) {
    return fetch(`${this._baseUrl}/articles/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
};

const mainApi = new MainApi(MAIN_API_BASE_URL);

export default mainApi;
