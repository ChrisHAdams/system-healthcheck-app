// Some header

const express = require('express');
const app = express();
const HealthCheck = require('./src/healthcheck/healthcheck');
const sysItems = require('./src/healthcheck/itemsToMonitor.json');
var logger = require('./src/logger.js');

// const router = express.Router();
const appPort = 8006;


myObject = new HealthCheck(sysItems, logger);
myObject.monitor();
logger.debug(myObject.getItems());


app.get('/', (req, res) => {
  res.send(`System Healthcheck Root.  ${myObject.monitor()}.`);
});

app.listen(appPort, () => {
  logger.info(`Healthcheck App Started.  Live at Port ${appPort}.`);

});

module.exports = app;
