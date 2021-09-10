export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers.authorization;
  }

  getprofileInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', {
      headers: {
        authorization: this.headers
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
      headers: {
        authorization: this.headers
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setProfileInfo(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: item.nickname,
        about: item.info,
      })
    });
  }

  setNewCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
      method: 'POST',
      headers: {
        authorization: this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
  }

  deleteCard(item) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/${item}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers,
      },
    });
  }

  likeCard(item) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${item}`, {
      method: 'PUT',
      headers: {
        authorization: this.headers,
      },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
  }

  dislikeCard(item) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/likes/${item}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers,
      },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      });
  }

  setNewAvatar(item) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.picture,
      })
    }).then((data) => {
      if (data.ok) {
        return data.json();
      }
    });
  }
}

