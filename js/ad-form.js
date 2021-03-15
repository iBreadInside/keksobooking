import {showSendMessage} from './show-alert.js';
import {DEFAULT_CENTER, coordinateField, mainPinMarker} from './map.js';
import {sendForm} from './network.js';

const adForm = document.querySelector('.ad-form');
const apartmentTypes = adForm.querySelector('#type');
const apartmentPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');
const roomCapacityCollection = roomCapacity.querySelectorAll('option');
const clearButton = adForm.querySelector('.ad-form__reset');

const APARTMENT_MIN_PRICES = ['0', '1000', '5000', '10000'];

const removeDisabled = (element) => {
  element.disabled = false;
};
const setDisabled = (element) => {
  element.disabled = true;
};
const removeSelected = (element) => {
  element.selected = false;
};
const setSelected = (element) => {
  element.selected = true;
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
  // Default
  roomCapacityCollection.forEach((element) => {
    if (element.value === '0') {
      element.disabled = true
    }
  });

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
    switch (roomNumber.value) {
      case '1':
        roomCapacityCollection.forEach((element) => {
          checkCase(element.value === '1', element);
        });
        break;
      case '2':
        roomCapacityCollection.forEach((element) => {
          checkCase(['1', '2'].includes(element.value), element);
        });
        break;
      case '3':
        roomCapacityCollection.forEach((element) => {
          checkCase(['1', '2', '3'].includes(element.value), element);
        });
        break;
      default:
        roomCapacityCollection.forEach((element) => {
          checkCase(element.value === '0', element);
        });
        break;
    }
  });

};

// Set default state
const setDefault = () => {
  adForm.reset();
  coordinateField.value = DEFAULT_CENTER;
  mainPinMarker.setLatLng(DEFAULT_CENTER);
};

// Send form
export const setAdFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendForm(
      new FormData(evt.target),
      (state) => {
        setDefault();
        showSendMessage(state);
      },
      (state) => {
        showSendMessage(state);
      });
  });
};

// Clear button
clearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefault();
});
