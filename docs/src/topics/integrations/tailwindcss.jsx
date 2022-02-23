import React from "react";
import {Code, DocBase, DocCmd} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Using TailwindCSS with GreenJS</h1>
        <p className="my-2">
            1. Install three packages: <DocCmd>npm install --save-dev tailwindcss concurrently greenjs</DocCmd>
        </p>
        <p className="my-2">
            2. Change <DocCmd>package.json</DocCmd> to include the following lines:
        </p>
        <Code>{`
"scripts": {
  "build": "tailwindcss -i App.css -o ./dist/Site.css --minify && greenjs build",
  "start": "mkdir -p dist && concurrently 'greenjs start' 'tailwindcss -i App.css -o ./dist/Site.css --watch'"
}
        `}</Code>
        <p className="my-2">
            3. Reference your TailwindCSS file by adding it to <DocCmd>App.js</DocCmd>
        </p>
        <Code>{`
<Head>
    <link rel="stylesheet" href="/Site.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
        `}</Code>
    </DocBase>
}