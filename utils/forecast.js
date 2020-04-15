const request = require("request");
require("dotenv").config({ path: ".env" }); // assuming ".env" is in root directory

const DAYS = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const getForecast = (res, location, coords) => {
  const token = process.env.DARKSKY_APIKEY; //Bitna's Darskey key
  const url = `https://api.darksky.net/forecast/${token}/${coords[1]},${coords[0]}?units=si`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      return res.render("index", {
        error: `cannot fetch weather at your location`,
      });
    }
    console.log(body);
    let data = body.hourly.data.slice().map((item) => {
      item.dayOfTheWeek = DAYS[new Date(item.time * 1000).getDay()];
      item.time = new Date(item.time * 1000).getHours();
      let suffix = item.time < 12 ? " AM" : " PM";
      item.time = item.time % 12 || 12;
      item.time = item.time + suffix;
      //adjust temperature to get a whole number
      item.temperature = Math.floor(item.temperature) + "°C";

      return item;
    }); //get the hourly forecast, translate unix time to JS date obj
    data = data.filter((item, index) => {
      return index % 4 === 0 && index < 24;
    });
    //adjust the current data
    body.currently.temperature = Math.floor(body.currently.temperature) + "°C";
    return res.render("index", {
      forecast: {
        location: location,
        temperature: body.currently.temperature,
        summary: body.currently.summary,
      },
      hourly: data,
    });
  });
};

module.exports = getForecast;
