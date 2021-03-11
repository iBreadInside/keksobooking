import {showGetFail} from './show-alert.js';

export const getApartments = (onSuccess) => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
      showGetFail('Не удалось загрузить объявления. Пожалуйста, обновите страницу');
    });
};

// Send form
export const sendForm = (userForm, onSuccess, onError) => {
  return fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(userForm),
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess('success');
    } else {
      onError('error');
    }
  })
    .catch(() => {
      onError('error');
    })
};
