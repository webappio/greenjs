import {CustomPluginOptions, LoadResult, ResolveIdResult, TransformResult} from "rollup";
import {GenerateEntryClient, GenerateEntryServer, GenerateIndex} from "./resources";
import {PluginOption, send} from "vite";
import {basename} from "path";


export default function GreenJSEntryPlugin(): PluginOption {
  return {
    name: 'greenjs-entry-plugin',
    resolveId(source: string, importer: string | undefined, options: {
      custom?: CustomPluginOptions;
      ssr?: boolean;
    }): Promise<ResolveIdResult> | ResolveIdResult {
      if(basename(source) === "index.html") {
        return {id: 'index.html'};
      }
      if(source.endsWith("@greenjs-entry-client.jsx")) {
        return {id: "entry-client.jsx"}
      }
      if(source.endsWith("@greenjs-entry-server.jsx")) {
        return {id: "entry-server.jsx"}
      }
    },
    load(id: string, options?: { ssr?: boolean }): Promise<LoadResult> | LoadResult {
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
        if(req?.url?.endsWith('.html') || req?.url === "/") {
          let html = await server.pluginContainer.load("index.html");
          html = await server.transformIndexHtml("/index.html", String(html), req?.originalUrl)
          return send(req, res, html, 'html', {
            headers: server.config.server.headers
          })
        }
        next();
      })
    }
  }
}
