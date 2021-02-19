import {APARTMENTS_AMOUNT, generateApartmentsArray} from './generate-apartments-array.js';
import {makeElement} from './make-element.js';

const mapCanvas = document.querySelector('#map-canvas');
const apartments = generateApartmentsArray(APARTMENTS_AMOUNT);

const renderOneApartment = (element) => {
  const cardTemplate = document.querySelector('#card').content.cloneNode(true).querySelector('.popup');
  // console.log(cardTemplate);
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

  const flatWords = ['комната', 'комнаты', 'комнат'];
  const guestWords = ['гостя', 'гостей'];
  const roomText = (element.offer.rooms === 5) ? flatWords[2] : (element.offer.rooms > 1) ? flatWords[1] : flatWords[0];
  const guestText = (element.offer.guests === 1) ? guestWords[0] : guestWords[1];

  // switch (element.offer.rooms) {
  //   case 1:
  //     roomText = flatWords[0];
  //     break;
  //   case element.offer.rooms >= 2 && element.offer.rooms <= 4:
  //     roomText = flatWords[1];
  //     break;
  //   case 5:
  //     roomText = flatWords[2];
  //     break;
  // }

  // if (element.offer.guests === 1) {
  //   guestText = guestWords[0];
  // } else {
  //   guestText = guestWords[1];
  // }

  cardTemplate.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} ${roomText} для ${element.offer.guests} ${guestText}`;
  cardTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  cardTemplate.querySelector('.popup__features').innerHTML = '';
  for (let i = 0; i < element.offer.features.length; i++) {
    const featureItem = makeElement('li', 'popup__feature');
    featureItem.classList.add(`popup__feature--${element.offer.features[i]}`);
    cardTemplate.querySelector('.popup__features').appendChild(featureItem);
  }

  cardTemplate.querySelector('.popup__description').textContent = element.offer.description;

  // const photoTemp = cardTemplate.querySelector('.popup__photos').querySelector('.popup__photo');
  // console.log(photoTemp);
  cardTemplate.querySelector('.popup__photos').innerHTML = '';
  for (let i = 0; i < element.offer.photos.length; i++) {
    // const photoItem = cardTemplate.querySelector('.popup__photos').appendChild(photoTemp);
    // photoItem.src = element.offer.photos[i];
    // console.log(photoItem)
    const photoItem = makeElement('img', 'popup__photo');
    photoItem.src = element.offer.photos[i];
    photoItem.width = '45';
    photoItem.height = '40';
    photoItem.alt = 'Фотография жилья';
    cardTemplate.querySelector('.popup__photos').appendChild(photoItem);
  }

  return cardTemplate;
};

const oneNodeElement = renderOneApartment(apartments[0]);

mapCanvas.appendChild(oneNodeElement);
