const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Daniel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Daniel",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help message!",
    title: "Help",
    name: "Daniel",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        location,
        forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Daniel",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Daniel",
  });
});

app.listen(3000, () => {
  console.log("Hello from the server on port 3000");
});
