const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require("body-parser");

const app = express(),
  port = 3000;

app.use(bodyParser.json());

//ideally these should be coming from environment variable or from constant file
const apiKey = '94b4fb078c6447f17ff96477b5ebcfbb';
const url = 'http://api.openweathermap.org/data/2.5';

app.get('/api/weather', (req, res) => {
  fetchFromOpenApi(req, res, 'weather');
});

app.get('/api/forecast', (req, res) => {
  fetchFromOpenApi(req, res, 'forecast')
});

function fetchFromOpenApi(req, res, type) {
  let loc = req.query.loc
  if (!loc) {
    res.send(400)
  }
  fetch(`${url}/${type}?q=${loc}&appid=${apiKey}`)
    .then(res => res.json())
    .then(json => {
      //Skipping type comparison (using != instead of !==) for status since for forecast api is sending resp in string.
      if (json.cod && json.cod != 200) {
        return res.status(json.cod).send({
          message: json.message || "Some Error Occurred, Please try again in sometime."
        });
      }
      res.status(200).send(json)
    })
    .catch(err => {
      console.log('Error occurred while fetching Weather, Errr is:', err)
      res.status(503).send("Service Down")
    });
}

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

