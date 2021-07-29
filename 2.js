const ObjectsToCsv = require('objects-to-csv');
var gplay = require('google-play-scraper');

gplay.list({
     category: gplay.category.GAME,
     collection: gplay.collection.TOP_FREE,
     num: 100
     })
     .then((data) => {
     
     data.forEach(item => {
     gplay.app({
     appId: item.appId,
     developer: item.developer,
     app: item.title
     })
     .then((response) => {
     
 (async () => {
     const obj = [{
     installs: response.installs,
     minInstalls: response.minInstalls,
     maxInstalls: response.maxInstalls,
     developer: item.developer,
     title: item.title
     }];
     
     const csv = new ObjectsToCsv(obj);
     await csv.toDisk('./test2.csv');
     console.log(await csv.toString());
     })();
 
 });
 
 })
 });