import {toggleFormsState} from './forms-disabled.js';

export const mapTokyo = L.map('map-canvas').on('load', () => {
  toggleFormsState();
}).setView({
  lat: 35.6800,
  lng: 139.7600,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapTokyo);


// Marker
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

const getCoordinates = () => {
  mainPinMarker.on('moveend', (evt) => {
    const rawCoordinates = evt.target.getLatLng();
    const fixedCoordinates = [rawCoordinates.lat.toFixed(5), rawCoordinates.lng.toFixed(5)];
    coordinateField.value = fixedCoordinates;
  });
};
getCoordinates();
