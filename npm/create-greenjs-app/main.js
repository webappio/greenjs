#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

function copyFolderRecursiveSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach(file => {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, path.basename(curSource)));
            } else {
                fs.writeFileSync(path.join(target, path.basename(curSource)), fs.readFileSync(curSource));
            }
        });
    }
}

if(process.argv.length > 3) {
    console.error("Usage: npx create-greenjs-example (destination directory)");
    process.exit(1);
}

let dest = "greenjs-example";
if(process.argv.length === 3) {
    dest = process.argv[2];
}

copyFolderRecursiveSync(path.join(__dirname, "template"), dest)

process.chdir(dest);
childProcess.execSync("npm install");

console.log("Successfully created greenjs project at " + dest);
console.log("Go to the " + dest + " directory and run 'npm run start' to start the development server")