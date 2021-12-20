import React from "react";
import {DocBase, DocCmd, DocLink} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">GreenJS Basics</h1>
        <p>To start using GreenJS, <DocLink href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm">install node.js and NPM</DocLink> and run <DocCmd>npx create-greenjs-app</DocCmd> </p>
        <p>This will create a folder named <i>greenjs-example</i> with the following directory structure:</p>
        <span className="mt-2">greenjs-example/</span>
        <span className="ml-4">dist/</span>
        <span className="ml-8">static/</span>
        <span className="ml-12">greenjs-white.svg</span>
        <span className="ml-4">pages</span>
        <span className="ml-4">App.css</span>
        <span className="ml-4">App.js</span>
        <span className="ml-4">package.json</span>
        <span className="ml-4">node_modules</span>
        <span className="ml-4">package-lock.json</span>
        <span className="ml-4">.gitignore</span>
        <h3 className="font-bold text-lg my-4">Commands</h3>
        <h5 className="font-bold text-md">greenjs start</h5>
        <p>To start a development webserver, enter the directory (for example, <DocCmd>cd greenjs-example</DocCmd>) and run <DocCmd>npm run start</DocCmd></p>
        <p>This will read the 'start' script from package.json which runs <DocCmd>greenjs start</DocCmd> to start the development webserver.</p>
        <p>Assuming everything went well, you should be able to see your webserver running at <DocCmd>localhost:8000</DocCmd></p>

        <h5 className="font-bold text-md mt-4">greenjs build</h5>
        <p>To build the application for production, run <DocCmd>npm run build</DocCmd>, which reads the 'build' script from package.json to run <DocCmd>greenjs build</DocCmd></p>
        <p>After building, your <DocCmd>dist/</DocCmd> folder will contain an <DocCmd>index.html</DocCmd> file which can be hosted on a static site provider</p>
    </DocBase>
}