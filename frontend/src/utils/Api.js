import { apiConfig } from './constants';

export class Api {
    constructor({url}) {
      this._url = url;
    }

    // Проверка ответа от сервера
    _checkServerResponse(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }

    // Получить список всех карточек в виде массива (GET)
    getInitialCards() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}cards`, {
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        }
      })
      .then(this._checkServerResponse)
    }

    // Получить данные пользователя (GET)
    getProfileInfo() {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}users/me`, {
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        }
      })
      .then(this._checkServerResponse)
    }

    // Заменить данные пользователя (PATCH)
    editProfileInfo(userInfo) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}users/me`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userInfo)
      })
      .then(this._checkServerResponse)
    }

    // Добавить карточку (POST)
    addNewCard(cardInfo) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cardInfo)
      })
      .then(this._checkServerResponse)
    }

    // Удалить карточку (DELETE)
    deleteCard(id) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
      })
      .then(this._checkServerResponse)
    }

    // Поставить или убрать лайк карточки (PUT/DELETE)
    changeLikeCardStatus(id, isLiked) {
      const token = localStorage.getItem('jwt');
      if (isLiked) {
        return fetch(`${this._url}cards/${id}/likes`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            authorization: `Bearer ${token}`
          },
        })
        .then(this._checkServerResponse)
      } else {
          return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              authorization: `Bearer ${token}`
            },
        })
        .then(this._checkServerResponse)
      }
    }

    // Заменить аватар (PATCH)
    editAvatar(avatarLink) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(avatarLink)
      })
      .then(this._checkServerResponse)
    }
  }

export const apiNew = new Api(apiConfig);
