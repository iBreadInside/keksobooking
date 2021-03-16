import {adFormInnerLinks, onAdFormSubmit} from './ad-form.js';
import {toggleAdFormState, disableFilterState} from './forms-disabled.js';
import {mapFunctions} from './map.js';

toggleAdFormState();
disableFilterState();
adFormInnerLinks();
onAdFormSubmit();
mapFunctions();
