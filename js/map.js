/* global L:readonly */
import {toggleFormsState} from './forms-disabled.js';
import {getApartments} from './network.js';
import {renderOneApartment} from './render-one-apartment.js';


export const coordinateField = document.querySelector('#address');

export const DEFAULT_CENTER = ['35.68000', '139.76000'];

const mapTokyo = L.map('map-canvas').on('load', () => {
  toggleFormsState();
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

// Set dafault and get main marker's coordinates
export const getCoordinates = () => {
  coordinateField.value = DEFAULT_CENTER;
  mainPinMarker.on('moveend', (evt) => {
    const rawCoordinates = evt.target.getLatLng();
    const fixedCoordinates = [rawCoordinates.lat.toFixed(5), rawCoordinates.lng.toFixed(5)];
    coordinateField.value = fixedCoordinates;
  });
};

// Generate apartments marks
const apartmentPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

getApartments((apartments) => {
  apartments.forEach(apartment => {
    const apartmentPinMarker = L.marker(
      {
        lat: apartment.location.lat,
        lng: apartment.location.lng,
      },
      {
        icon: apartmentPinIcon,
      },
    )
    apartmentPinMarker.addTo(mapTokyo).bindPopup(renderOneApartment(apartment));
  })
});
