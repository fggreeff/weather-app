const req = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  req(
    {
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=mX5Gk86WoyUcSy72dgUAGA9xjdcWKibT&location=${encodedAddress}`,
      json: true,
    },
    (error, response, body) => {
      if (error) {
        callback(`Unable to connect to map service ${error}`, undefined);
      } else if (body === undefined) {
        callback(
          'Unable to find address, please enter a valid address',
          undefined,
        );
      } else {
        callback(undefined, {
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].latLng.lat,
          longatude: body.results[0].locations[0].latLng.lng,
        });
      }
    },
  );
};

module.exports.geocodeAddress = geocodeAddress;
