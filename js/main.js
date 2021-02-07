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

// Author
const Autor = ['img/avatars/user0' + getRandomNumber(1, 8, 0) + '.png'];
console.log(Autor);
