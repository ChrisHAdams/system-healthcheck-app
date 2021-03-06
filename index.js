
const express = require('express');
const app = express();
const HealthCheck = require('system-healthcheck');
const os = require('os');
const path = require('path');
const appPort = 8006;
const config = require('config');

var logger = require('./src/logger.js');



let healthcheckObject = new HealthCheck(config.get('healthcheck'), logger);

function intervalFunc() {
  logger.info('Running monitor from interval');

  healthcheckObject.monitor();
}


app.get('/api', (req, res) => {
  res.send(`System Healthcheck API Root.`);
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

app.use("/", express.static(path.join(__dirname, "dist")));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


app.listen(appPort, () => {
  logger.info(`Healthcheck App Started.  Live at http://${os.hostname()}/${appPort}.`);
  logger.info(`Get list of items to monitor.  http://${os.hostname()}/${appPort}/api/getItems.`);
  logger.info(`Run the monitor.  http://${os.hostname()}/${appPort}/api/runMonitor.`);
  setInterval(intervalFunc, 600000);

});

module.exports = app;
