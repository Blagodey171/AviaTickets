import locations from './state.js';

let response = locations.getDataLocations();

response.then(data => {
     
    console.log(locations)
    // console.log(locations.getCitiesByCountryCode('PE'))

});

