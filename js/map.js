/* global L:readonly */
import {toggleFormsState} from './forms-disabled.js';
import {APARTMENTS_AMOUNT, generateApartmentsArray} from './generate-apartments-array.js';
import {renderOneApartment} from './render-one-apartment.js';

const mapTokyo = L.map('map-canvas').on('load', () => {
  toggleFormsState();
}).setView({
  lat: 35.6800,
  lng: 139.7600,
}, 12);

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

const mainPinMarker = L.marker(
  {
    lat: 35.6800,
    lng: 139.7600,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapTokyo);

// Get coordinates
const coordinateField = document.querySelector('#address');

export const getCoordinates = () => {
  mainPinMarker.on('moveend', (evt) => {
    const rawCoordinates = evt.target.getLatLng();
    const fixedCoordinates = [rawCoordinates.lat.toFixed(5), rawCoordinates.lng.toFixed(5)];
    coordinateField.value = fixedCoordinates;
  });
};
// getCoordinates();

// Generate apartments marks

const apartmentPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const generatePopups = generateApartmentsArray(APARTMENTS_AMOUNT).forEach(apartment => {
  const apartmentPinMarker = L.marker(
    {
      lat: apartment.location.x,
      lng: apartment.location.y,
    },
    {
      icon: apartmentPinIcon,
    },
  )
  apartmentPinMarker.addTo(mapTokyo).bindPopup(renderOneApartment(apartment));
});
