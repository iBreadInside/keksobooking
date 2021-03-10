import {showGetFail} from './show-alert.js';

export const getApartments = () => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .catch(() => {
      showGetFail('Не удалось получить список объявлений. Попробуйте обновить страницу');
    });
};

// Send form
export const sendForm = (userForm) => {
  return fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(userForm),
    },
  );
}
