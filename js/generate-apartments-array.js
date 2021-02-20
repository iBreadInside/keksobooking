// Функция вызова случайного числа
import {getRandomNumber} from './get-random-number.js';

// Random sorting
import {shuffle} from './shuffle.js';
import {changeArray} from './change-array.js';

// Make apartments array
export const APARTMENTS_AMOUNT = 10;

export const generateApartmentsArray = (amount) => {
  const apartments = [];
  for (let i = 0; i < amount; i++) {
    // Author
    const author = {avatar : `img/avatars/user0${getRandomNumber(1, 8, 0)}.png`};

    // Offer
    // Offer__Variables
    const locationX = getRandomNumber(35.65, 35.7, 5);
    const locationY = getRandomNumber(139.7, 139.8, 5);
    const types = ['palace', 'flat', 'house', 'bungalow'];
    const checks = ['12:00', '13:00', '14:00'];

    // Offer__Features
    const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    // Offer__Photos
    const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

    const offer = {
      title : 'Лучшие объявления',
      address : `${locationX}, ${locationY}`,
      price : getRandomNumber(0, 30000, 0),
      type : types[getRandomNumber(0, types.length - 1, 0)],
      rooms : getRandomNumber(1, 5, 0),
      guests : getRandomNumber(1, 10, 0),
      checkin : checks[getRandomNumber(0, checks.length - 1, 0)],
      checkout : checks[getRandomNumber(0, checks.length - 1, 0)],
      features : changeArray(shuffle(features)),
      description : 'Уютное помещение. Хорошее освещение. Тепло зимой',
      photos : changeArray(shuffle(photos)),
    };

    // Location
    const location = {
      x : locationX,
      y : locationY,
    }

    apartments[i] = {author, offer, location};

  }
  return apartments;
}
