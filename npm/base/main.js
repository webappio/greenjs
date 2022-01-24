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
        console.error("No greenjs binaries installed. Perhaps your platform isn't supported?");
        return;
    }

    if(files.length > 1) {
        console.error("Multiple greenjs binaries installed. Delete node_modules and re-install.");
        return;
    }

    fs.readdir(path.join(__dirname, "node_modules", "@greenio", files[0], "bin"), (err, binNames) => {
        let executable = path.join(__dirname, "node_modules", "@greenio", files[0], "bin", binNames[0]);

        //replace main.js with an executable if we're using npm
        if(["linux"].includes(process.platform)) {
            fs.copyFile(executable, __filename, err => {
                if(err) {
                    console.log(err);
                } else {
                    fs.chmodSync(__filename, 0o755);
                }
            })
        }

        try {
            let child = child_process.spawn(executable, process.argv.slice(2));
            child.stdout.setEncoding("utf8");
            child.stdout.on('data', data => console.log(data));
            child.stderr.setEncoding("utf8");
            child.stderr.on('data', data => console.log(data));
        } catch (e) {
            process.exit(e.status);
        }
    });
});

