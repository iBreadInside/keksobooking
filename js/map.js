/* global L:readonly _:readonly*/
import {toggleAdFormState, activateFilterState} from './forms-disabled.js';
import {getApartments} from './network.js';
import {renderOneApartment} from './render-one-apartment.js';

export const coordinateField = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
const filterGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelector('#housing-features');

export const DEFAULT_CENTER = ['35.68000', '139.76000'];
const PRICE_LIMITS = [10000, 50000];
const RERENDER_DELAY = 500;

const mapTokyo = L.map('map-canvas').on('load', () => {
  toggleAdFormState();
}).setView({
  lat: DEFAULT_CENTER[0],
  lng: DEFAULT_CENTER[1],
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapTokyo);


// Main Marker
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

export const mainPinMarker = L.marker(
  {
    lat: DEFAULT_CENTER[0],
    lng: DEFAULT_CENTER[1],
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapTokyo);
coordinateField.value = DEFAULT_CENTER;

// Set dafault and get main marker's coordinates
const getCoordinates = (marker) => {
  const rawCoordinates = marker.getLatLng();
  const fixedCoordinates = [rawCoordinates.lat.toFixed(5), rawCoordinates.lng.toFixed(5)];
  return fixedCoordinates;
};

const moveMarker = (arr) => {
  mainPinMarker.on('moveend', (evt) => {
    pinLayer.clearLayers();
    coordinateField.value = getCoordinates(evt.target);
    drawMarkers(mapFilter(arr));
  });
};

// Generate apartments marks
const pinLayer = L.layerGroup();

const apartmentPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Get distance from main pin
const getDistance = (pin, apartment) => {
  const pinLocation = pin.getLatLng();
  const distance = Math.sqrt(((pinLocation.lat - apartment.location.lat) ** 2) + ((pinLocation.lng - apartment.location.lng) ** 2));
  return distance;
};

// Sorting
const sortApartments = (apartmentA, apartmentB) => {
  const distanceA = getDistance(mainPinMarker, apartmentA);
  const distanceB = getDistance(mainPinMarker, apartmentB);

  return distanceA - distanceB;
};

// Make Pin
const makePin = (el, layer) => {
  const apartmentPinMarker = L.marker(
    {
      lat: el.location.lat,
      lng: el.location.lng,
    },
    {
      icon: apartmentPinIcon,
    },
  );
  apartmentPinMarker.addTo(layer).bindPopup(renderOneApartment(el));
};

// Getting apartments and draw them on map
const drawMarkers = (apArr) => {
  pinLayer.clearLayers();
  apArr.slice().sort(sortApartments).slice(0, 10).forEach(apartment => {
    makePin(apartment, pinLayer);
  });
  pinLayer.addTo(mapTokyo);
};

// Filter
const mapFilter = (apartments) => {
  // Price checker
  const priceCheck = (apartmentArr) => {
    const apPrice = apartmentArr.offer.price;

    if ((filterPrice.value === 'middle' && PRICE_LIMITS[0] <= apPrice && apPrice <= PRICE_LIMITS[1]) ||
    (filterPrice.value === 'low' && apPrice < PRICE_LIMITS[0]) ||
    (filterPrice.value === 'high' && apPrice > PRICE_LIMITS[1]) ||
    filterPrice.value === 'any') {
      return true;
    }
  };

  // Feature checker
  const getChecked = [...filterFeatures.querySelectorAll('input[type="checkbox"]:checked')];
  const getCheckedValues = getChecked.map((el) => {
    return el.value;
  });
  const checker = (featuresServerArr, checkedArr) => {
    return checkedArr.every(el => featuresServerArr.includes(el));
  };

  return apartments.filter(el =>
    (el.offer.type === filterType.value || filterType.value === 'any') && // Type filter
    (priceCheck(el)) && // Price filter
    (el.offer.rooms === Number(filterRooms.value) || filterRooms.value === 'any') &&  // Room number filter
    (el.offer.guests === Number(filterGuests.value) || filterGuests.value === 'any') && // Guest number filter
    (checker(el.offer.features, getCheckedValues) || getCheckedValues.length === 0), // Features filter
  );
};

const evtFilter = (arr) => {
  filterForm.addEventListener('change', _.debounce(
    () => {
      pinLayer.clearLayers();
      drawMarkers(mapFilter(arr));
    },
    RERENDER_DELAY,
  ));
};

export const mapFunctions = () => {
  getApartments((apartments) => {
    activateFilterState();
    drawMarkers(apartments);
    evtFilter(apartments);
    moveMarker(apartments);
  });
};
