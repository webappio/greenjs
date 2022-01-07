import React from "react";
import {Code, DocBase} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">ESBuild configuration</h1>
        <p>GreenJS comes with a default configuration, but you can edit <code>greenjs.json</code> to customize the configuration. To create this file, use <code>npx greenjs genconfig</code></p>
        <p>
            esbuild is the library that GreenJS uses to create the html and javascript in the <code>dist</code> folder.
        </p>
        <h3 className="mt-4 mb-2 font-bold text-lg">Description of greenjs.json</h3>
        <Code lang="json">{`
{
  "esbuild": {
    "entry_point_name": "App.js", //the name of the main app file, usually the one that calls Render(site)
    "file_import_types": { //see https://esbuild.github.io/content-types/ for advanced details
      ".css": "css", //when you import Thing from "./hello.css", it's a list of css rules - if you'd like the string contents, use ".css": "text"
      ".jpeg": "file",
      ".jpg": "file",
      ".js": "jsx",
      ".jsx": "jsx",
      ".png": "file",
      ".svg": "file",
      ".ts": "tsx",
      ".tsx": "tsx"
    },
    "out_dir": "dist", //output to dist/(files)
    "minify_whitespace": "only-prod", //only minify destination files in production
    "minify_syntax": "only-prod"
  },
  (other greenjs configuration)
}

        `}</Code>
    </DocBase>
}