import {createServer} from 'vite'
import react from '@vitejs/plugin-react';
import GreenJSEntryPlugin from "../greenjs-entry-plugin.js";
import {routeMatches} from "../routeMatches.js";
import {access} from "fs";


export default class Start {
  static description = 'Start a development server for the project'

  static examples = [
    `$ greenjs start
Pre-bundling dependencies:
  react-dom
  @greenio/head
  @greenio/router
  react/jsx-dev-runtime
(this will be run only when your dependencies or config have changed)
  > Local: http://localhost:3000/
  > Network: use \`--host\` to expose
`,
  ]

  static args = []

  // static flags = {
  //   'upstream-addr': Flags.string({char: 'u', description: 'Where to forward upstream requests', required: false})
  // };

  async run(upstreamAddr: string) {
    // const {args, flags} = await this.parse(Start)
    const knownRoutes = new Set<string>();
    const knownNotRoutes = new Set<string>();
    let checkKnownRoute: (route: string) => Promise<void> = async route => {};
    let isKnownRoute = async (path: string) => {
      try {
        await checkKnownRoute(path);
      } catch (e) {
        console.error(e);
        return true; //on error, show it to the user
      }
      if(knownRoutes.has(path)) {
        return true;
      }
      for(let route of knownRoutes) {
        if(routeMatches(route, path)) {
          return true;
        }
      }
      return false;
    };

    let configAccessErr = await new Promise(resolve => access("greenjs.config.js", err => err ? resolve(err) : resolve(null)));

    if(configAccessErr) {
      console.log("Configuration file at greenjs.config.js does not exist. Using default configuration.");
    }
    const server = await createServer({
      plugins: [
        react(),
        GreenJSEntryPlugin(isKnownRoute, upstreamAddr),
      ],
      publicDir: "dist",
      configFile: !configAccessErr ? "greenjs.config.js" : false,
    });
    (async () => {
      const {render} = await server.ssrLoadModule("/@greenjs-entry-server.jsx");
      checkKnownRoute = async route => {
        if(knownRoutes.has(route)) {
          return;
        }
        const ctx = {
          routes: {},
          headTags: [],
        };
        await render("http://localhost" + route, ctx);
        Object.keys(ctx.routes).forEach(x => knownRoutes.add(x));
      }
    })().catch(x => {
      console.error("Error finding routes: " + x)
      if(x.stack) {
        console.error(x.stack);
      }
    });
    await server.listen();
    server.printUrls();
  }
}
