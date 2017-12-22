import axios from 'axios';
import { $ } from './bling';

const mapOptions = {
  center: { lat: 7.7420082, lng: 27.587732 },
  zoom: 7.04
}

function loadPlaces() {
  // api call to load coordinates
}

function makeMap(mapDiv) {
  if (!mapDiv) return;
  // make our map
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
}

export default makeMap;