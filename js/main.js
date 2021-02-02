// Случайное целое число из заданного диапазона
let getRandomInt = (min, max) => {
  return (min < 0 || min >= max) ? 'Введен некорректный диапазон' : Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(3, 15)
