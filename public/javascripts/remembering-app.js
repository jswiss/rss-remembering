import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import makeMap from './modules/map';

// autocomplete($('#address'), $('#lat'), $('#lng'));

// typeAhead($('.search'));

makeMap($('#map'));

// $$ from bling.js allows you to select multiple elements without having to loop over them a la jQuery
// const heartForms = $$('form.heart');
// heartForms.on('submit', ajaxHeart);