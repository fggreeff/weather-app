const yargs = require('yargs');
const axios = require('axios');
const tempConversion = require('./Utils/temp-converter');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
      default: 'E2 9RP',
      defaultDescription: 'default is e2 9rp',
    },
  })
  .help()
  .alias('h', 'help')
  .showHelpOnFail(false, 'Specify --help or -h for available options').argv;

if (argv.address === '') {
  console.log('You have not specified an address');
}
const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=mX5Gk86WoyUcSy72dgUAGA9xjdcWKibT&location=${encodedAddress}`;
axios
  .get(geocodeUrl)
  .then((response) => {
    if (
      response.data === ''
      || response.data.results[0].providedLocation.location === ''
    ) {
      throw new Error('Unable to find address 🤷 please enter a valid address');
    }
    const weatherURL = `https://api.darksky.net/forecast/a3413d35c3fef650c812974fc8449b6d/${
      response.data.results[0].locations[0].latLng.lat
    },${response.data.results[0].locations[0].latLng.lng}`;
    console.log(
      `Address: ${response.data.results[0].providedLocation.location}`,
    );
    return axios.get(weatherURL).then((response) => {
      const currentTemp = `${response.data.currently.temperature}`;
      const apparentTemp = `${response.data.currently.apparentTemperature}`;

      console.log(
        `Temp 🌡️: ${tempConversion.celsius(
          currentTemp,
        )}\nApparent Temp 🌡️: ${tempConversion.celsius(apparentTemp)}`,
      );
    });
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('🔥 Unable to connect to api service 🔥');
    } else {
      console.log(e.message);
    }
  });
