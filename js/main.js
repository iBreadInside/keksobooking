// Случайное целое число из заданного диапазона
const getRandomInt = (min, max) => {
  return (min < 0 || max < 0) ? 'Доступны только положительные значения' :
    (min >= max) ? (
      [min, max] = [max, min],
      Math.floor(Math.random() * (max - min + 1)) + min) :
      Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(4, 3)

// Случайное число с плавающей точкой
const getRandomFloat = (min, max, decimal) => {
  return (min < 0 || max < 0) ? 'Доступны только положительные значения' :
    (min >= max) ? (
      [min, max] = [max, min],
      ((Math.random() * (max - min)) + min).toFixed(decimal)) :
      (Math.random() * (max - min) + min).toFixed(decimal);
}

getRandomFloat(4.2, 4.1, 3)
