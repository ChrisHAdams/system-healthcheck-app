const request = require('./request');
const webService = require('./webService');
const ping = require('./pingServer');
const DateAndTime = require('./dateAndTimeFunctions');
const writeLineToFileFunc = require('./fileOperations').writeLineToFile;
const database = require('./databaseCheck');

const filePath = './monitor_reports';
const fileName = DateAndTime.getReverseDate(new Date());

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

  this.getItems = function(){
    return this.itemsToCheck;
  }

  function writeLineToFile(textToWrite){
    writeLineToFileFunc(log, filePath, fileName, textToWrite);
  }

  this.monitor = async function(){

    log.info("About to run monitoring checks");

    var arrayLength = this.itemsToCheck.length;
    var start = new Date();

    try {
      for (var i = 0; i < arrayLength; i++) {

        if(this.itemsToCheck[i].checkType === CHECKTYPE.website){
          this.itemsToCheck[i].responseDetails = await request.makeHttpRequest(this.itemsToCheck[i], log);
        }
        if(this.itemsToCheck[i].checkType === CHECKTYPE.service){
          this.itemsToCheck[i].responseDetails = await webService.makeWebServiceRequest(this.itemsToCheck[i], log);
        }
        if(this.itemsToCheck[i].checkType === CHECKTYPE.server){
          this.itemsToCheck[i].responseDetails = await ping.makePingRequest(this.itemsToCheck[i], log);
        }
        if(this.itemsToCheck[i].checkType === CHECKTYPE.database){
          this.itemsToCheck[i].responseDetails = await database.makeDatabaseRequest(this.itemsToCheck[i], log);
        }
      }

      writeLineToFile("");
      writeLineToFile(DateAndTime.getDateAndTime(start));

      for (var j = 0; j < arrayLength; j++) {

        let item = this.itemsToCheck[j];
        writeLineToFile(`${item.checkType} - ${item.name}.  Status Code - ${item.responseDetails.responseCode}.  Response Time - ${this.itemsToCheck[j].responseDetails.responseTime}ms.`);

        if(item.hasOwnProperty('expectedResults')){
          if(item.responseDetails.responseCode !== item.expectedResults.expectedStatusCode) {
            writeLineToFile(`    Status Code Check Failed.  Expected ${item.expectedResults.expectedStatusCode}.  Actual ${item.responseDetails.responseCode}.`);
          }

          if(item.responseDetails.responseTime > item.expectedResults.expectedResponseTime){
            writeLineToFile(`    Response Time Check Failed.  Expected ${item.expectedResults.expectedResponseTime}ms.  Actual ${item.responseDetails.responseTime}ms.`);
          }
        }
      }

      writeLineToFile('='.repeat(80));

    } catch(err){
      log.error("In healthcheck.js catch function");
      log.error(err);
    }

    log.info("Completed monitoring checks.");

    return JSON.stringify(this.itemsToCheck);

  }
}
module.exports = Healthcheck;
