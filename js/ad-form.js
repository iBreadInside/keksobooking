export const adFormInnerLinks = () => {

  const adForm = document.querySelector('.ad-form');

  // Change minimum apartment price according to the type
  const apartmentTypes = adForm.querySelector('#type');
  const apartmentPrice = adForm.querySelector('#price');
  const APARTMENT_MIN_PRICES = ['0', '1000', '5000', '10000'];

  apartmentTypes.addEventListener('change', () => {
    apartmentPrice.min = APARTMENT_MIN_PRICES[apartmentTypes.selectedIndex];
    apartmentPrice.placeholder = APARTMENT_MIN_PRICES[apartmentTypes.selectedIndex];
  });

  // Bonding of time in and time out
  const timeIn = adForm.querySelector('#timein');
  const timeOut = adForm.querySelector('#timeout');

  timeIn.addEventListener('change', () => {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });
  timeOut.addEventListener('change', () => {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

};
