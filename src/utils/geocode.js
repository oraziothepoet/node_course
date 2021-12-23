const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXJ0aHVyc2Nob3BlbmhhdWVyIiwiYSI6ImNrd2t5amZmbDF3eG4ycG5zMGI3a3duc3IifQ.nkdM7-swaUzBLXnNQp8TwA`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.message === "Not Found" || body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
