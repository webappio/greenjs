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

// Check if the --template flag was used
const TEMPLATES = {
    "docs": true,
    "profile": true,
    "saas-landing": true,
    "base-template": true,
}
let exampleTemplate = "";
for (let i = 0; i < process.argv.length; i++) {
    const command = process.argv[i];
    if (command.includes("--template")) {
        const templateName = command.split("template=")[1];
        if (templateName in TEMPLATES) {
            exampleTemplate = templateName;
        }
    }
}

if(process.argv.length > 4) {
    console.error("Usage: npx create-greenjs-example (destination directory) --template=\"\"");
    process.exit(1);
}


let dest = "greenjs-example";
if((process.argv.length === 3 && exampleTemplate.length === 0) || process.argv.length === 4) {
    dest = process.argv[2];
}

let templatePath = path.join(__dirname, "templates", "base-template");
if (exampleTemplate.length > 0) {
    templatePath = path.join(__dirname, "templates", exampleTemplate)
}


copyFolderRecursiveSync(templatePath, dest)

process.chdir(dest);
childProcess.execSync("npm install");

console.log("Successfully created greenjs project at " + dest);
console.log("Go to the " + dest + " directory and run 'npm run start' to start the development server")