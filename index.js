// Some header

const express = require('express');
const app = express();
const HealthCheck = require('./src/healthcheck/healthcheck');
const sysItems = require('./src/healthcheck/itemsToMonitor.json');
var logger = require('./src/logger.js');

// const router = express.Router();
const appPort = 8006;


myObject = new HealthCheck(sysItems, logger);
//myObject.monitor();


app.get('/', (req, res) => {
  res.send(`System Healthcheck Root.`);
});

app.get('/runMonitor', (req, res) => {

  logger.info("Receive runMonitor request");

  myObject.monitor()
    .then(function (result) {
      res.send(result);
    }, function(error) {
      res.error(error);
  });
});

app.get('/getItems', (req, res) => {

  logger.info("Receive getItems request");

  res.send(myObject.getItems());

});

app.listen(appPort, () => {
  logger.info(`Healthcheck App Started.  Live at Port ${appPort}.`);

});

module.exports = app;
