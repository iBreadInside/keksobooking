/* global L:readonly _:readonly*/
import {toggleAdFormState, activateFilterState} from './forms-disabled.js';
import {getApartments} from './network.js';
import {renderOneApartment} from './render-one-apartment.js';

export const DEFAULT_CENTER = ['35.68000', '139.76000'];
const PRICE_LIMITS = [10000, 50000];
const RERENDER_DELAY = 500;

export const coordinateField = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRooms = filterForm.querySelector('#housing-rooms');
const filterGuests = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelector('#housing-features');
const featuresCheckboxes = [...filterFeatures.querySelectorAll('.map__checkbox')];



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

const moveMarker = (apartments) => {
  mainPinMarker.on('moveend', (evt) => {
    pinLayer.clearLayers();
    coordinateField.value = getCoordinates(evt.target);
    drawMarkers(mapFilter(apartments));
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
const drawMarkers = (apartments) => {
  pinLayer.clearLayers();
  apartments.slice().sort(sortApartments).slice(0, 10).forEach(apartment => {
    makePin(apartment, pinLayer);
  });
  pinLayer.addTo(mapTokyo);
};

// Filter

//Type check
const typeCheck = (apartment) => {
  return apartment.offer.type === filterType.value || filterType.value === 'any';
};

// Price check
const priceCheck = (apartment) => {
  return ((filterPrice.value === 'middle' && PRICE_LIMITS[0] <= apartment.offer.price && apartment.offer.price <= PRICE_LIMITS[1]) ||
  (filterPrice.value === 'low' && apartment.offer.price < PRICE_LIMITS[0]) ||
  (filterPrice.value === 'high' && apartment.offer.price > PRICE_LIMITS[1]) ||
  filterPrice.value === 'any');
};

// Room number filter
const roomsCheck = (apartment) => {
  return apartment.offer.rooms === Number(filterRooms.value) || filterRooms.value === 'any';
};

// Guest number filter
const guestsCheck = (apartment) => {
  return apartment.offer.guests === Number(filterGuests.value) || filterGuests.value === 'any';
};

// Features filter
const compareFeatures = (apartmentFeatures, filterFeatures) => {
  return filterFeatures.every(el => apartmentFeatures.includes(el));
};

const featureCheck = (apartment) => {
  const checkedFeatures = featuresCheckboxes.filter(feature => feature.checked);
  const getCheckedValues = checkedFeatures.map(feature => feature.value);

  return compareFeatures(apartment.offer.features, getCheckedValues) || getCheckedValues.length === 0;
};

const mapFilter = (apartments) => {
  return apartments.filter(el =>
    typeCheck(el) && // Type filter
    priceCheck(el) && // Price filter
    roomsCheck(el) &&  // Room number filter
    guestsCheck(el) && // Guest number filter
    featureCheck(el), // Features filter
  );
};

const filterFormChange = (apartments) => {
  filterForm.addEventListener('change', _.debounce(
    () => {
      pinLayer.clearLayers();
      drawMarkers(mapFilter(apartments));
    },
    RERENDER_DELAY,
  ));
};

export const mapFunctions = () => {
  getApartments((apartments) => {
    activateFilterState();
    drawMarkers(apartments);
    filterFormChange(apartments);
    moveMarker(apartments);
  });
};
