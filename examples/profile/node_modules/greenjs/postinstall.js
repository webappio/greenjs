let fs = require("fs");

fs.readdir(__dirname, (err, files) => {
    console.log(err);
    console.log(files);
})