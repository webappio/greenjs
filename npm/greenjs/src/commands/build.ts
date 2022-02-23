import {Command, Flags} from '@oclif/core'

// import vm from 'vm';
// import {readFile} from 'fs';
// import * as os from "os";
import * as vite from 'vite';
import react from "@vitejs/plugin-react";
import {writeFile, unlink, mkdir} from 'fs';
import {GenerateIndex} from "../resources";
import GreenJSEntryPlugin from "../greenjs-entry-plugin";
import * as path from "path";

interface HeadTag {
  type: string,
  attrs: any, //TODO map of string to [bool, string]
  innerText: string,
}

interface RenderResult {
  path: string;
  appBody: string;
  routes: string[];
  headTags: HeadTag[];
}

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

  async renderPage(render: (path: string, ctx: object) => Promise<string>, path: string): Promise<RenderResult> {
    const ctx = {
      routes: {},
      headTags: [],
    };
    const appBody = await render("http://localhost" + path, ctx);
    return {
      path,
      appBody,
      routes: Object.keys(ctx.routes),
      headTags: ctx.headTags,
    }
  }

  static writeFile(filePath: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      mkdir(path.dirname(filePath), {recursive: true}, err => {
        if(err) {
          reject(err);
          return;
        }
        writeFile(filePath, data, err => {
          if(err) {
            reject(err);
            return;
          }
          resolve();
        })
      })
    });
  }

  async renderAllPages(render: (path: string, ctx: object) => Promise<string>) {
    const pathsSeen = new Set<string>();
    const pathsToExplore = new Set<string>();
    pathsToExplore.add("/");
    while (pathsToExplore.size > 0) {
      const promises = [...pathsToExplore].map(x => this.renderPage(render, x));
      pathsToExplore.clear();
      for (let result of await Promise.all(promises)) {
        for (let route of result.routes) {
          if (!pathsSeen.has(route)) {
            pathsSeen.add(route);
            pathsToExplore.add(route);
          }
        }

        let filename = "index.html";
        if (result.path !== "/") {
          filename = result.path + ".html";
        }

        await Build.writeFile(
          path.join("dist", filename),
          GenerateIndex(
            result.headTags.map(
              ({type, attrs, innerText}) => {
                let attrList = Object.keys(attrs ?? {}).map(key => {
                  if(typeof attrs[key] === "boolean") {
                    return key;
                  } else {
                    return key+`="`+attrs[key]+`"`
                  }
                });
                return `<${type}${attrList.length > 0 ? " " : ""}${attrList.join(" ")}>${innerText || ""}</${type}>`
              }).join("\n"),
            result.appBody,
            `<script src="/client.js"></script>`
          ),
        )
      }
    }
  }

  async run() {
    const {args, flags} = await this.parse(Build)

    this.log("Building...")
    await vite.build({
      plugins: [
        react(),
        GreenJSEntryPlugin(),
      ],
      publicDir: "dist",
      build: {
        ssr: true,
        rollupOptions: {
          input: {
            "server": "@greenjs-entry-server.jsx",
            "client": "@greenjs-entry-client.jsx",
          },
          output: {
            format: "commonjs",
          }
        },
      },
    });

    // @ts-ignore
    const {render} = await import(path.resolve("dist", "server.js"));
    await this.renderAllPages(render);
    await new Promise((resolve, reject) => unlink(
      path.resolve("dist", "server.js"),
        err => err ? reject(err) : resolve(err)
    ));

    this.log(`Source has been written to the dist/ folder!`)
  }
}
