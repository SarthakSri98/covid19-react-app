


import lscache from 'lscache';

let api = {};
api.getLatestUpdates = function () {
  return new Promise((resolve, reject) => {
    if (lscache.get('updates')) {
      resolve(lscache.get('updates'));
    }
    else {
      fetch("https://api.covid19india.org/updatelog/log.json").then(res => res.json()).then(result => {
        lscache.set("updates", result, 15);
        resolve(result);
      }).catch(() => {
        reject("500 error");
      });
    }
  })
}

api.getRawData = function () {
  return new Promise((resolve, reject) => {
    if (lscache.get('rawdata')) {
      resolve(lscache.get('rawdata'));
    }
    else {
      fetch("https://api.covid19india.org/v4/min/data.min.json").then(res => res.json()).then(result => {
        lscache.set("rawdata", result, 15);
        resolve(result);
      }).catch(() => {
        reject("500 error");
      });
    }
  })

}

export default api;

