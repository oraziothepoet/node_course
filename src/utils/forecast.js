const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=77a64426b90a8d83e04942ddda41efe4&query=${lon},${lat}`;
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect. Try again later", undefined);
      } else if (body.error) {
        callback("Location not found. Try another search", undefined);
      } else {
        callback(
          undefined,
          `${body.current.weather_descriptions}. The temperature is ${body.current.temperature}, and it feels like ${body.current.feelslike}`
        );
      }
    }
  );
};

module.exports = forecast;
