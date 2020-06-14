const csvtojson = require("csvtojson");
const fs = require("fs");

const csvToJson_func = (csvFile = "customer-data.csv") => {
    csvtojson()
        .fromFile(csvFile)
        .then((jsonObj) => {
            // console.log(jsonObj);

            fs.writeFile(csvFile.substr(0, csvFile.length-3) + "json", JSON.stringify(jsonObj, null, 2), (error) => {
                if(error) return process.exit(1);

                console.log(csvFile, " converted to JSON file");
            });
            
        });
};
    
csvToJson_func(process.argv[2]);

