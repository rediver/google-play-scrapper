const ObjectsToCsv = require('objects-to-csv');
var gplay = require('google-play-scraper');
gplay.list({
        category: gplay.category.GAME,
        collection: gplay.collection.TOP_FREE,
        num: 5
    })
    .then((data) => {
        let resuls = [];
        data.forEach(item => {
            gplay.app({
                    appId: item.appId,
                    developer: item.developer,
                    app: item.title
                })
                .then((response) => {
                    results.push({
                            installs: response.installs,
                            minInstalls: response.minInstalls,
                            maxInstalls: response.maxInstalls,
                            developer: item.developer,
                            title: item.title
                        })

                });

        })
         (async () => {                   

                        const csv = new ObjectsToCsv(result);
                        await csv.toDisk('./test2.csv');
                        console.log(await csv.toString());
                    
                    })();
    });