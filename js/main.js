import {adFormInnerLinks, setAdFormSubmit} from './ad-form.js';
import {toggleAdFormState, toggleFilterState} from './forms-disabled.js';
import {getCoordinates} from './map.js';

toggleAdFormState();
toggleFilterState();
adFormInnerLinks();
getCoordinates();
setAdFormSubmit();
