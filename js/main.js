import {adFormInnerLinks, setAdFormSubmit} from './ad-form.js';
import {toggleAdFormState, disableFilterState} from './forms-disabled.js';
import {getCoordinates, evtFilter} from './map.js';

toggleAdFormState();
disableFilterState();
adFormInnerLinks();
getCoordinates();
setAdFormSubmit();
evtFilter();
