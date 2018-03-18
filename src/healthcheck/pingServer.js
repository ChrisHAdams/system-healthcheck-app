const ping = require('ping');

async function makePingRequest(requestObj,log){

  const start    = Date.now();
  const response = await ping.promise.probe(requestObj.url);
  const end      = Date.now() - start;

  let status = response.alive ? "Alive" : "Dead";

  log.info(`Called ${requestObj.name}.  Response Code : ${status}.  Response Time : ${response.max}.`);

  const responseObj=JSON.parse(`{"responseCode": "${status}", "responseTime": ${response.max}}`);

  return responseObj;

}

module.exports = {makePingRequest};