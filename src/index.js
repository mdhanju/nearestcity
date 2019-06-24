const fs = require("fs");
const csv = require("csvtojson");
const csvFilePath = "./locations/uscitiesv1.5.csv";

csv()
    .fromFile(csvFilePath)
    .then(_jsonObj => {
        var i = 0;
        const jsonObj = _jsonObj.map(item => {
            item.country = "US";
            // console.log("\n\n\n\n", item && item.population);
            // console.log(item);
            if (!item.population) {
                // console.log(" MISSING DATA");
                i++;
            }
            return item;
        });
        console.log(" Total", jsonObj.length);
        console.log(" MISSING DATA, i", i);
        let data = JSON.stringify(jsonObj);

        fs.writeFileSync("./locations/address.json", data);
    });
