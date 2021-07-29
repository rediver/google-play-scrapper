const ObjectsToCsv = require('objects-to-csv');
var gplay = require('google-play-scraper');
    

async function process() {

    let results = [];
    const gp_list = await gplay.list({
        category: gplay.category.GAME,
        collection: gplay.collection.TOP_FREE,
        num: 5
    });

 

    gp_list.forEach(item => {
        const gp_app = await gplay.app({
            appId: item.appId,
            developer: item.developer,
            app: item.title
        });
        results.push({
            installs: gp_app.installs,
            minInstalls: gp_app.minInstalls,
            maxInstalls: gp_app.maxInstalls,
            developer: item.developer,
            title: item.title
        })
    });
    const csv = new ObjectsToCsv(results);
    await csv.toDisk('./test2.csv');
    console.log(await csv.toString());
}
process();