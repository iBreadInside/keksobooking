// Функция вызова случайного числа
const getRandomNumber = (min, max, fractionDigits) => {
  const fractionMultiplier = Math.pow(10, fractionDigits);
  min = Math.abs(min);
  max = Math.abs(max); // Условия для поиска среди положительных значений
  if (min > max) [min, max] = [max, min];
  return Math.round(
    (Math.random() * (max - min) + min) * fractionMultiplier,
  ) / fractionMultiplier;
};

getRandomNumber(-15, -3, 3); // Получаем дробное число
getRandomNumber(-25, 3, 0); // Получаем целое число

// Random sorting
let shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let changeArray = (array) => {
  let finalArray = [];
  for (let j = 0; j <= getRandomNumber(1, array.length - 1, 0) ; j++) {
    finalArray[j] = array[j];
  }
  return finalArray;
}

// Make array
const OBJECT_NUMBER = 10;

const generateArray = (number) => {
  let objectsArray = [];
  for (let i = 0; i < number; i++) {
    // Author
    let author = {avatar : `img/avatars/user0${getRandomNumber(1, 8, 0)}.png`};

    // Offer
    // Offer__Variables
    let locationX = getRandomNumber(35.65, 35.7, 5);
    let locationY = getRandomNumber(139.7, 139.8, 5);
    const typesArray = ['palace', 'flat', 'house', 'bungalow'];
    const checksArray = ['12:00', '13:00', '14:00'];

    // Offer__Features
    const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    // Offer__Photos
    const photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

    let offer = {
      title : 'Лучшие объявления',
      adress : `${locationX}, ${locationY}`,
      price : getRandomNumber(0, 30000, 0),
      type : typesArray[getRandomNumber(0, typesArray.length - 1, 0)],
      rooms : getRandomNumber(1, 5, 0),
      guests : getRandomNumber(1, 10, 0),
      checkin : checksArray[getRandomNumber(0, checksArray.length - 1, 0)],
      checkout : checksArray[getRandomNumber(0, checksArray.length - 1, 0)],
      features : changeArray(shuffle(featuresArray)),
      description : 'Уютное помещение. Хорошее освещение. Тепло зимой',
      photos : changeArray(shuffle(photosArray)),
    };

    // Location
    let location = {
      x : locationX,
      y : locationY,
    }

    objectsArray[i] = {author, offer, location};

  }
  return objectsArray;
}

generateArray(OBJECT_NUMBER);
