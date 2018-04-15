function runMonitor() {

  const host = window.location.host;
  const monitorUrl = `http://${host}/runMonitor`;

  console.log(monitorUrl);

  fetch(monitorUrl);
  //.then(function(response) {
  //  console.log (response.json());
  //})
  //.then(function(myJson) {
  //  console.log(myJson);
  //});
}