const rp = require('request-promise');

async function makeWebServiceRequest(requestObj,log){

  var options = {
    uri: requestObj.url,
    headers: requestObj.headers,
    resolveWithFullResponse: true,
    method: requestObj.method,
    body: requestObj.payload
  };

  const start = Date.now();

  var responseObject = await rp(options)
    .then(function(response) {
      const end = Date.now() - start;    
      log.info(`    Called ${requestObj.name}.  Response Code : ${response.statusCode}.  Response Time : ${end}ms.`);
      const responseObj=JSON.parse(`{"responseCode": ${response.statusCode}, "responseTime": ${end}}`);
      return responseObj;    
    })
    .catch(function(error) {
      const end = Date.now() - start;
      log.info(`    Called ${requestObj.name}.  Response Code : ${error.statusCode}.  Response Message ${error.response.statusMessage}.  Response Time : ${end}ms.`);
      const responseObj=JSON.parse(`{"responseCode": ${error.statusCode}, "responseMessage": "${error.response.statusMessage}", "responseTime": ${end}}`);
      return responseObj;        
    });

  return responseObject;
}

module.exports = {makeWebServiceRequest};