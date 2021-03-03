const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const setDisabledAttribute = (nodeList) => {
  nodeList.forEach(element => element.disabled = true);
};
const removeDisabledAttribute = (nodeList) => {
  nodeList.forEach(element => element.disabled = false);
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
