const req = require('request');

const geocodeAddress = (address) => {
  const encodedAddress = encodeURIComponent(address);
  req(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=mX5Gk86WoyUcSy72dgUAGA9xjdcWKibT&location=${encodedAddress}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        console.log(`unable to connect to map service ${error}`);
      } else if (body === undefined) {
        console.log('Unable to find address, please enter a valid address');
      } else {
        console.log(`Address: ${body.results[0].providedLocation.location}`);
        console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
        console.log(`Longatude: ${body.results[0].locations[0].latLng.lng}`);
      }
      // console.log(JSON.stringify(error, undefined, 2));
    },
  );
};

module.exports.geocodeAddress = geocodeAddress;
