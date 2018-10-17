const req = require('request');

const getWeather = (latitude, longatude, callback) => {
  req(
    {
      url: `https://api.darksky.net/forecast/a3413d35c3fef650c812974fc8449b6d/${latitude},${longatude}`,
      json: true,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: `Temp is ${
            body.currently.temperature
          }, although it feels like`,
          apparentTemperature: body.currently.apparentTemperature,
        });
      } else {
        callback('Unable to fetch weather');
      }
    },
  );
};

module.exports.getWeather = getWeather;
