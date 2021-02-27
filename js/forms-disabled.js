const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const setDisabledAttribute = (array) => {
  array.forEach(element => element.setAttribute('disabled', 'disabled'));
};
const removeDisabledAttribute = (array) => {
  array.forEach(element => element.removeAttribute('disabled'));
};

export const toggleFormsState = () => {
  if (adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.remove('ad-form--disabled');
    removeDisabledAttribute(adForm.querySelectorAll('fieldset'));
  } else {
    adForm.classList.add('ad-form--disabled');
    setDisabledAttribute(adForm.querySelectorAll('fieldset'));
  }

  if (mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.remove('map__filters--disabled');
    removeDisabledAttribute(mapFiltersForm.querySelectorAll('select'));
    removeDisabledAttribute(mapFiltersForm.querySelectorAll('fieldset'));
  } else {
    mapFiltersForm.classList.add('map__filters--disabled');
    setDisabledAttribute(mapFiltersForm.querySelectorAll('select'));
    setDisabledAttribute(mapFiltersForm.querySelectorAll('fieldset'));
  }
};
