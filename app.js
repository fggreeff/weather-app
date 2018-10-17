const req = require('request');

req(
  {
    url:
      'http://www.mapquestapi.com/geocoding/v1/address?key=mX5Gk86WoyUcSy72dgUAGA9xjdcWKibT&location=1301%20lombard%20street%20philadelphia',
    json: true,
  },
  (error, response, body) => {
    console.log(`Address: ${body.results[0].providedLocation.location}`);
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longatude: ${body.results[0].locations[0].latLng.lng}`);

    // console.log(JSON.stringify(error, undefined, 2));
  },
);
