const ListUrl = window.location.protocol + "//"
                + window.location.hostname + ":"
                + window.location.port + "/api/getItems";

export function loadMonitorItems(){
  console.log(ListUrl);

  return new Promise((resolve, reject) => {

    fetch(ListUrl)
      .then(result => resolve(result.json()));

  });

}