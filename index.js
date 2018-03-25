const express = require('express');
const app = express();
const HealthCheck = require('./src/healthcheck/healthcheck');

var config = require('config');
var logger = require('./src/logger.js');

const appPort = 8006;

let healthcheckObject = new HealthCheck({"items": config.get('items'), "sendEmail": true}, logger);

function intervalFunc() {
  logger.info('Running monitor from interval');
  //let intervalHealthcheckObject = new HealthCheck({"items": config.get('items'), "sendEmail": true}, logger);
  healthcheckObject.monitor();
}


app.get('/', (req, res) => {
  res.send(`System Healthcheck Root.`);
});

app.get('/api/runMonitor', (req, res) => {

  logger.info("Received on-demand runMonitor request");

  healthcheckObject.monitor()
    .then(function (result) {
      res.send(result);
    })
    .catch(function(error) {
      res.status(500).send(error);
    });
});

app.get('/api/getItems', (req, res) => {

  logger.info("Received getItems request");

  res.send(healthcheckObject.getItems());

});


app.listen(appPort, () => {
  logger.info(`Healthcheck App Started.  Live at Port ${appPort}.`);

  setInterval(intervalFunc, 600000);

});

module.exports = app;
