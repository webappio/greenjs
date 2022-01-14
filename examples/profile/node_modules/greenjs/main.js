#!/usr/bin/env node

let fs = require("fs");
let path = require("path")
let child_process = require('child_process');

fs.readdir(path.join(__dirname, "node_modules", "@greenio"), (err, files) => {
    if(err) {
        console.error(err.message);
        return;
    }
    if(files.length === 0) {
        console.error("No greenjs binaries installed.");
        return;
    }
    if(files.length > 1) {
        console.error("Multiple greenjs binaries installed. Delete node_modules and re-install.");
        return;
    }

    fs.readdir(path.join(__dirname, "node_modules", "@greenio", files[0], "bin"), (err, binNames) => {
        try {
            child_process.execFileSync(
                path.join(__dirname, "node_modules", "@greenio", files[0], "bin", binNames[0]),
                process.argv.slice(2)
            );
        } catch (e) {
            process.exit(e.status);
        }
    });
});

