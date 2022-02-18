import {Command, Flags} from '@oclif/core'

// import vm from 'vm';
// import {readFile} from 'fs';
// import * as os from "os";
import * as vite from 'vite';
import react from "@vitejs/plugin-react";

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
    await vite.build({
      plugins: [react()],
      publicDir: "dist",
    });

    // @ts-ignore
    // const {render} = await import("./dist/server/entry-server.js");

    this.log(`Source has been written to the dist/ folder!`)
  }
}
