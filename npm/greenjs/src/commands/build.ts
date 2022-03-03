import * as vite from 'vite';
import react from "@vitejs/plugin-react";
import {writeFile, rm, mkdir} from 'fs';
import GreenJSEntryPlugin from "../greenjs-entry-plugin.js";
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

export default class Build {
  static description = 'Make a production build of the project'

  static examples = [
    `$ greenjs build
Source has been written to the dist/ folder!
`,
  ]

  // static flags = {
  //   from: Flags.string({char: 'f', description: 'Whom is saying hello', required: false}),
  // }

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
        if (err) {
          reject(err);
          return;
        }
        writeFile(filePath, data, err => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        })
      })
    });
  }

  async renderAllPages(render: (path: string, ctx: object) => Promise<string>, generatedIndex: string) {
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
          generatedIndex
            .replace(/<div id="app"><\/div>/g, `<div id="app">`+result.appBody+`</div>`)
            .replace(/<\/head>/g, result.headTags.map(
              ({type, attrs, innerText}) => {
                let attrList = Object.keys(attrs ?? {}).map(key => {
                  if (typeof attrs[key] === "boolean") {
                    return key;
                  } else {
                    return key + `="` + attrs[key] + `"`
                  }
                });
                return `<${type}${attrList.length > 0 ? " " : ""}${attrList.join(" ")}>${innerText || ""}</${type}>`
              }).join("\n") + "</head>"
            )
        )
      }
    }
  }

  async run() {
    // const {args, flags} = await this.parse(Build)

    const [clientResult, serverResult] = await Promise.all([
      vite.build({
        plugins: [
          react(),
          GreenJSEntryPlugin()
        ],
        publicDir: "dist",
        build: {
          outDir: "dist",
          rollupOptions: {
            input: {
              "client": "index.html",
            },
            output: {
              format: "esm",
            }
          }
        }
      }),
      vite.build({
        plugins: [
          react(),
          GreenJSEntryPlugin(),
        ],
        build: {
          outDir: "server-build",
          ssr: true,
          minify: false,
          rollupOptions: {
            input: {
              "server": "@greenjs-entry-server.jsx",
            },
            output: {
              format: "cjs",
              chunkFileNames: chunkInfo => (chunkInfo.name || "")+".cjs",
              entryFileNames: chunkInfo => (chunkInfo.name || "")+".cjs",
            }
          },
        },
      })
    ]);

    let generatedIndex: string = "";
    if ("output" in clientResult) {
      let outputChunk = clientResult.output.find(x => x.type === "asset" && x.fileName === "index.html");
      if(outputChunk && "source" in outputChunk && typeof outputChunk.source === "string") {
        generatedIndex = outputChunk.source;
      }
    }
    if(generatedIndex === "") {
      console.error("Internal error: Could not find output file name")
      process.exit(1);
    }

    // @ts-ignore
    const {render} = await import(path.resolve("server-build", "server.cjs"));
    await this.renderAllPages(render, generatedIndex);
    await new Promise((resolve, reject) => rm("server-build",
      {recursive: true},
      err => err ? reject(err) : resolve(err)
    ));

    console.log(`Source has been written to the dist/ folder!`)
  }
}
