const rp = require('request-promise');

async function makeHttpRequest(requestObj,log){

  var options = {
    uri: requestObj.url,
    resolveWithFullResponse: true
  };

  const start    = Date.now();
  const response = await rp(options);
  const end      = Date.now() - start;

  log.info(`    Called ${requestObj.name}.  Response Code : ${response.statusCode}.  Response Time : ${end}.`);

  const responseObj=JSON.parse(`{"responseCode": ${response.statusCode}, "responseTime": ${end}}`);

  return responseObj;

}

module.exports = {makeHttpRequest};