import {showSendMessage} from './show-alert.js';
import {DEFAULT_CENTER_COORDINATES, coordinateField, mainPinMarker} from './map.js';
import {sendForm} from './network.js';

const APARTMENT_MIN_PRICES = ['0', '1000', '5000', '10000'];
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const avatarInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
const apartmentType = adForm.querySelector('#type');
const apartmentPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');
const roomCapacityOptions = roomCapacity.querySelectorAll('option');
const clearButton = adForm.querySelector('.ad-form__reset');
const apartmentPhotoInput = adForm.querySelector('#images');
const apartmentPreview = adForm.querySelector('.ad-form__photo');

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

const setApartmentMinPrice = (prices) => {
  apartmentPrice.min = prices[apartmentType.selectedIndex];
  apartmentPrice.placeholder = prices[apartmentType.selectedIndex];
}

export const adFormInnerLinks = () => {
  // Default
  roomCapacityOptions.forEach((element) => {
    if (element.value === '0') {
      element.disabled = true
    }
  });

  // Change minimum apartment price according to the type

  apartmentType.addEventListener('change', () => {
    setApartmentMinPrice(APARTMENT_MIN_PRICES);
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
        roomCapacityOptions.forEach((element) => {
          checkCase(element.value === '1', element);
        });
        break;
      case '2':
        roomCapacityOptions.forEach((element) => {
          checkCase(['1', '2'].includes(element.value), element);
        });
        break;
      case '3':
        roomCapacityOptions.forEach((element) => {
          checkCase(['1', '2', '3'].includes(element.value), element);
        });
        break;
      default:
        roomCapacityOptions.forEach((element) => {
          checkCase(element.value === '0', element);
        });
        break;
    }
  });
};

// Set default state
const setDefault = () => {
  adForm.reset();
  coordinateField.value = DEFAULT_CENTER_COORDINATES;
  mainPinMarker.setLatLng(DEFAULT_CENTER_COORDINATES);
  setApartmentMinPrice(APARTMENT_MIN_PRICES);
  avatarPreview.src = 'img/muffin-grey.svg';
  apartmentPreview.style = '';
};

// Send form
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

// Clear button
clearButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefault();
});

// Photos

// Avatar
avatarInput.addEventListener('change', () => {
  const avatarFile = avatarInput.files[0];
  const fileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(avatarFile);
  }
});

// Apartment photo
apartmentPhotoInput.addEventListener('change', () => {
  const photoFile = apartmentPhotoInput.files[0];
  const fileName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      apartmentPreview.style.backgroundSize = 'contain';
      apartmentPreview.style.backgroundPosition = 'center';
      apartmentPreview.style.backgroundRepeat = 'no-repeat';
      apartmentPreview.style.backgroundImage = `url('${reader.result}')`;
    });

    reader.readAsDataURL(photoFile);
  }
});
