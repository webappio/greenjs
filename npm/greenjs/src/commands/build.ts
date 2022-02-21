import {Command, Flags} from '@oclif/core'

// import vm from 'vm';
// import {readFile} from 'fs';
// import * as os from "os";
import * as vite from 'vite';
import react from "@vitejs/plugin-react";
import {writeFile} from 'fs';
import {GenerateIndex, GenerateEntryClient, GenerateEntryServer} from "../resources";
import type { LoadResult, ResolveIdResult } from 'rollup';
import GreenJSEntryPlugin from "../greenjs-entry-plugin";

export default class Build extends Command {
  static description = 'Make a production build of the project'

  static examples = [
    `$ greenjs build
Source has been written to the dist/ folder!
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Whom is saying hello', required: false}),
  }

  static args = []

  async run() {
    const {args, flags} = await this.parse(Build)
    // const serverJS = await new Promise(resolve => readFile("./dist/server/entry-server.js", data => resolve(data)));
    // const {render} = await import(process.cwd() + "/dist/server/entry-server.js");
    // const {render} = await vite.ssrLoadModule("src/entry-server.jsx");
    // this.log(render("/", {}));

    this.log("Building...")
    const buildResults = await vite.build({
      plugins: [
        react(),
        GreenJSEntryPlugin(),
      ],
      publicDir: "dist",
    });
    // if (!("output" in buildResults)) {
    //   throw new Error("Invalid build results from vite")
    // }
    // await new Promise((resolve, reject) => writeFile(
    //   "./dist/index.html",
    //   GenerateIndex("", "", `<script type="module" src="${buildResults.output[0].fileName}"></script>`),
    //   err => err ? reject(err) : resolve(err))
    // )

    // @ts-ignore
    // const {render} = await import("./dist/server/entry-server.js");

    this.log(`Source has been written to the dist/ folder!`)
  }
}
