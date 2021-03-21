import {makeElement} from './make-element.js';
import {makeDeclination} from './make-declination.js';

export const renderOneApartment = (element) => {
  const cardTemplate = document.querySelector('#card').content.cloneNode(true).querySelector('.popup');

  cardTemplate.querySelector('.popup__avatar').src = element.author.avatar;
  cardTemplate.querySelector('.popup__title').textContent = element.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = element.offer.address;
  cardTemplate.querySelector('.popup__text--price').innerHTML = element.offer.price + ' <span>₽/ночь</span>';

  switch (element.offer.type) {
    case 'palace':
      cardTemplate.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      cardTemplate.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      cardTemplate.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalow':
      cardTemplate.querySelector('.popup__type').textContent = 'Бунгало';
      break;
  }

  const FLAT_WORDS = ['комната', 'комнаты', 'комнат'];
  const GUEST_WORDS = ['гостя', 'гостей', 'гостей'];

  cardTemplate.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} ${makeDeclination(element.offer.rooms, FLAT_WORDS)} для ${element.offer.guests} ${makeDeclination(element.offer.guests, GUEST_WORDS)}`;
  cardTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  if (!element.offer.features) {
    cardTemplate.querySelector('.popup__features').remove();
  } else {
    cardTemplate.querySelector('.popup__features').innerHTML = '';
    for (let i = 0; i < element.offer.features.length; i++) {
      const featureItem = makeElement('li', 'popup__feature');
      featureItem.classList.add(`popup__feature--${element.offer.features[i]}`);
      cardTemplate.querySelector('.popup__features').appendChild(featureItem);
    }
  }

  if (!element.offer.description) {
    cardTemplate.querySelector('.popup__description').remove();
  } else {
    cardTemplate.querySelector('.popup__description').textContent = element.offer.description;
  }

  if (!element.offer.photos) {
    cardTemplate.querySelector('.popup__photos').remove();
  } else {
    cardTemplate.querySelector('.popup__photos').innerHTML = '';
    for (let i = 0; i < element.offer.photos.length; i++) {
      const photoItem = makeElement('img', 'popup__photo');
      photoItem.src = element.offer.photos[i];
      photoItem.width = '45';
      photoItem.height = '40';
      photoItem.alt = 'Фотография жилья';
      cardTemplate.querySelector('.popup__photos').appendChild(photoItem);
    }
  }

  return cardTemplate;
};
