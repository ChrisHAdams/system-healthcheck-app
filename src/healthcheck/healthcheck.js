const request = require('./request');
const ping = require('./pingServer');
const DateAndTime = require('./dateAndTimeFunctions');

function Healthcheck(itemsToCheck, log) {

  const CHECKTYPE = {
    website: "website",
    service: "service",
    server: "server",
    database: "database"
  }

  Object.freeze(CHECKTYPE)


  this.itemsToCheck = itemsToCheck;
  this.log = log;

  function writeLineToFile(outputString) {

    const fs = require('fs');
    const fileName = DateAndTime.getReverseDate();
    // add a line to a lyric file, using appendFile
    fs.appendFileSync(`./monitor_reports/${fileName}`, `\n${outputString}`, (err) => {
        if (err) throw err;
        log.error(err);
    });
  }

  this.getItems = function(){
    return this.itemsToCheck;
  }

  this.monitor = function(){
    log.info("About to run monitoring checks");

    ( async () => {

      var arrayLength = this.itemsToCheck.length;
      var start = new Date();

      try {
        for (var i = 0; i < arrayLength; i++) {

          if(this.itemsToCheck[i].checkType === CHECKTYPE.website){
            this.itemsToCheck[i].responseDetails = await request.makeHttpRequest(this.itemsToCheck[i], log);
          }
          if(this.itemsToCheck[i].checkType === CHECKTYPE.service){
            this.itemsToCheck[i].responseDetails = await request.makeHttpRequest(this.itemsToCheck[i], log);
          }
          if(this.itemsToCheck[i].checkType === CHECKTYPE.server){
            this.itemsToCheck[i].responseDetails = await ping.makePingRequest(this.itemsToCheck[i], log);
          }
        }

        writeLineToFile("");
        writeLineToFile(DateAndTime.getDateAndTime(start));

        for (var j = 0; j < arrayLength; j++) {

          let item = this.itemsToCheck[j];
          writeLineToFile(`${item.checkType} - ${item.name}.  Status Code - ${item.responseDetails.responseCode}.  Response Time - ${this.itemsToCheck[j].responseDetails.responseTime}ms.`);

          if(item.hasOwnProperty('expectedResults')){
            if(item.responseDetails.responseCode !== item.expectedResults.expectedStatusCode) {
              writeLineToFile(`    Status Code Check Failed.  Expected ${item.responseDetails.responseCode}.  Actual ${item.expectedResults.expectedStatusCode}.`);
            }

            if(item.responseDetails.responseTime > item.expectedResults.expectedResponseTime){
              writeLineToFile(`    Response Time Check Failed.  Expected ${item.expectedResults.expectedResponseTime}ms.  Actual ${item.responseDetails.responseTime}ms.`);
            }
          }
        }

        writeLineToFile('='.repeat(80));

      } catch(err){
        log.error(err)
      }

      log.info("Completed monitoring checks.");

    })().catch (e => {
      log.error(e);
    });
  }
}
module.exports = Healthcheck;
