var express = require("express");
var router = express.Router();
const getGeocode = require("../utils/geocode");
const getForecast = require("../utils/forecast");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (!req.query.city) {
    return res.render("index", {
      greeting: "You can search for a location to get its forecast",
    });
  }
  getGeocode(res, req.query.city, getForecast);
  //res.render("index", { city: req.query.city });
});

module.exports = router;
