const ListUrl = window.location.protocol + "//"
                + window.location.hostname + ":"
                + window.location.port + "/api/getItems";

const RunMonitorUrl = window.location.protocol + "//"
                        + window.location.hostname + ":"
                        + window.location.port + "/api/runMonitor";

export function loadMonitorItems(){
  console.log(ListUrl);

  return new Promise((resolve, reject) => {

    fetch(ListUrl)
      .then(result => resolve(result.json()));

  });

}

export function runMonitor(){
  console.log(RunMonitorUrl);

  return new Promise((resolve, reject) => {

    fetch(RunMonitorUrl)
      .then(result => resolve(result.json()));

  });

}