const request = require("request");
require("dotenv").config({ path: ".env" }); // assuming ".env" is in root directory

const getGeocode = (res, address, callback) => {
  const token = process.env.MAPBOX_APIKEY;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${token}`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      return res.render("index", { error: "cannot find your location" });
    }
    const coords = body.features[0].geometry.coordinates;
    const locationName = body.features[0].place_name;
    callback(res, locationName, coords);
  });
};

module.exports = getGeocode;
