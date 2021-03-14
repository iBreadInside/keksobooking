/* global L:readonly */
import {toggleAdFormState, toggleFilterState} from './forms-disabled.js';
import {getApartments} from './network.js';
import {renderOneApartment} from './render-one-apartment.js';
// import {sortApartments} from './sorting.js';

export const coordinateField = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const filterType = filterForm.querySelector('#housing-type');

export const DEFAULT_CENTER = ['35.68000', '139.76000'];

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

// Set dafault and get main marker's coordinates
export const getCoordinates = () => {
  coordinateField.value = DEFAULT_CENTER;
  mainPinMarker.on('moveend', (evt) => {
    const rawCoordinates = evt.target.getLatLng();
    const fixedCoordinates = [rawCoordinates.lat.toFixed(5), rawCoordinates.lng.toFixed(5)];
    coordinateField.value = fixedCoordinates;
    showAp();
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
}

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
}

const showAp = () => {
  getApartments((apartments) => {
    const apartmentsOffers = apartments;
    pinLayer.clearLayers();
    mapFilter(apartmentsOffers).slice()
      .sort(sortApartments)
      .slice(0, 10)
      .forEach(apartment => {
        makePin(apartment, pinLayer);
      });
    pinLayer.addTo(mapTokyo);
    toggleFilterState();
  });
};

showAp();

// Filter
// Get values from filter

const mapFilter = (apartments) => {
  return apartments.filter(el => (el.offer.type === filterType.value || filterType.value === 'any'));
};

export const evtFilter = () => {
  filterForm.addEventListener('change', () => {
    showAp();
  })
};
