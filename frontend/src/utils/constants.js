// export const apiConfig = {
//   url: 'https://mesto.nomoreparties.co/v1/cohort-55/',
//   headers: {
//     'Content-type': 'application/json',
//     authorization: '59fe9cd6-0f57-4ebd-bbbd-39bb16004429'
//   }
// }
// const token = localStorage.getItem('jwt');

export const apiConfig = {
  // url: 'http://localhost:3001/',
  url: process.env.NODE_ENV === 'production' ? 'https://api.instagram-killer.nomoredomains.monster/' : 'http://localhost:3001/',
  // headers: {
  //   'Content-type': 'application/json',
  //   authorization: `Bearer ${token}`
  // }
}

// export const BASE_URL = 'https://auth.nomoreparties.co/';

// export const BASE_URL = 'http://localhost:3001/';

// export const BASE_URL = 'https://api.instagram-killer.nomoredomains.monster/';

// Попробую так
export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.instagram-killer.nomoredomains.monster/' : 'http://localhost:3001/';
