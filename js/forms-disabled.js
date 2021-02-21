const adForm = document.querySelector('.ad-form');

const setDisabledAttribute = (array) => {
  array.forEach(element => element.setAttribute('disabled', 'disabled'));
};

export const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  setDisabledAttribute(adForm.querySelectorAll('fieldset'));
};

export const disableMapFilters = () => {
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('map__filters--disabled');
  setDisabledAttribute(mapFiltersForm.querySelectorAll('select'));
  setDisabledAttribute(mapFiltersForm.querySelectorAll('fieldset'));
};
