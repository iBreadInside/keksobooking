import {getRandomNumber} from './get-random-number.js';

export const changeArray = (array) => {
  let finalArray = [];
  for (let j = 0; j <= getRandomNumber(1, array.length - 1, 0) ; j++) {
    finalArray[j] = array[j];
  }
  return finalArray;
}
