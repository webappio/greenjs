import {CustomPluginOptions, LoadResult, ResolveIdResult, TransformResult} from "rollup";
import {GenerateEntryClient, GenerateEntryServer, GenerateIndex} from "./resources";
import {PluginOption, send} from "vite";
import {basename} from "path";


export default function GreenJSEntryPlugin(isKnownRoute?: (route: string) => Promise<boolean>): PluginOption {
  return {
    name: 'greenjs-entry-plugin',
    resolveId(source: string, importer: string | undefined, options: {
      custom?: CustomPluginOptions;
      ssr?: boolean;
    }): Promise<ResolveIdResult> | ResolveIdResult {
      console.log("resolve: " + source);
      if(basename(source) === "@index") {
        return {id: 'index.html'};
      }
      if(source.replace("/", "") === "@greenjs-entry-client.jsx") {
        return {id: "entry-client.jsx"}
      }
      if(source.replace("/", "") === "@greenjs-entry-server.jsx") {
        return {id: "entry-server.jsx"}
      }
    },
    load(id: string, options?: { ssr?: boolean }): Promise<LoadResult> | LoadResult {
      console.log("load: " + id);
      if(id === 'index.html') {
        return GenerateIndex("", "", `<script type="module" src="@greenjs-entry-client.jsx"></script>`);
      }
      if(id === 'entry-client.jsx') {
        return GenerateEntryClient();
      }
      if(id === 'entry-server.jsx') {
        return GenerateEntryServer();
      }
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if(!isKnownRoute || !await isKnownRoute(req.url || "")) {
          next();
          return;
        }

        let html = await server.pluginContainer.load("index.html");
        html = await server.transformIndexHtml("/index.html", String(html), req?.originalUrl)
        return send(req, res, html, 'html', {
          headers: server.config.server.headers
        })
      })
    }
  }
}
