const adForm = document.querySelector('.ad-form');
const apartmentTypes = adForm.querySelector('#type');
const apartmentPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');
const roomCapacityCollection = roomCapacity.querySelectorAll('option');

// const roomCapacityArray = [...adForm.querySelector('#capacity').children];

const APARTMENT_MIN_PRICES = ['0', '1000', '5000', '10000'];

const removeDisabled = (element) => {
  element.removeAttribute('disabled');
};
const setDisabled = (element) => {
  element.setAttribute('disabled', true);
};
const removeSelected = (element) => {
  element.removeAttribute('selected');
};
const setSelected = (element) => {
  element.setAttribute('selected', true);
};

const checkCase = (currentCase, element) => {
  if (currentCase) {
    removeDisabled(element);
    setSelected(element);
  } else {
    removeSelected(element);
    setDisabled(element);
  }
};

export const adFormInnerLinks = () => {

  // Change minimum apartment price according to the type
  apartmentTypes.addEventListener('change', () => {
    apartmentPrice.min = APARTMENT_MIN_PRICES[apartmentTypes.selectedIndex];
    apartmentPrice.placeholder = APARTMENT_MIN_PRICES[apartmentTypes.selectedIndex];
  });

  // Bonding of time in and time out
  timeIn.addEventListener('change', () => {
    timeOut.selectedIndex = timeIn.selectedIndex;
  });
  timeOut.addEventListener('change', () => {
    timeIn.selectedIndex = timeOut.selectedIndex;
  });

  // Bonds for room type and quests
  roomNumber.addEventListener('change', () => {
    switch (roomNumber.selectedIndex) {
      case 0:
        roomCapacityCollection.forEach((element) => {
          checkCase(element.value == 1, element);
        });
        break;
      case 1:
        roomCapacityCollection.forEach((element) => {
          checkCase(['1', '2'].includes(element.value), element);
        });
        break;
      case 2:
        roomCapacityCollection.forEach((element) => {
          checkCase(['1', '2', '3'].includes(element.value), element);
        });
        break;
      default:
        roomCapacityCollection.forEach((element) => {
          checkCase(element.value == 0, element);
        });
        break;
    }
  });

};
