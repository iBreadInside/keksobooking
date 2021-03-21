// Функция для подбора склонений
export const makeDeclination = (num, words) => {
  num = Math.abs(num) % 100;
  const num1 = num % 10;
  if (num > 10 && num < 20) { return words[2]; }
  if (num1 > 1 && num1 < 5) { return words[1]; }
  if (num1 === 1) { return words[0]; }
  return words[2];
};
