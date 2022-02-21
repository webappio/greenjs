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
import * as path from "path";

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
      build: {
        ssr: true,
        rollupOptions: {
          input: {
            "main": "@greenjs-entry-server.jsx",
          },
          output: {
            format: "commonjs",
          }
        },
      },
    });

    // @ts-ignore
    // const {render} = await import("./dist/" + buildResults?.output[0].fileName);
    const {render} = await import(path.resolve("dist", buildResults?.output[0].fileName));
    const ctx = {};
    this.log(render("http://localhost/", ctx));
    console.log(ctx);

    this.log(`Source has been written to the dist/ folder!`)
  }
}
