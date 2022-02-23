import {CustomPluginOptions, LoadResult, ResolveIdResult, TransformResult} from "rollup";
import {GenerateEntryClient, GenerateEntryServer, GenerateIndex} from "./resources";
import {PluginOption, send} from "vite";
import {basename} from "path";
import {createProxyMiddleware} from 'http-proxy-middleware';

export default function GreenJSEntryPlugin(
  isKnownRoute?: (route: string) => Promise<boolean>,
  upstreamAddr?: string
): PluginOption {
  return {
    name: 'greenjs-entry-plugin',
    resolveId(source: string, importer: string | undefined, options: {
      custom?: CustomPluginOptions;
      ssr?: boolean;
    }): Promise<ResolveIdResult> | ResolveIdResult {
      // console.log("resolve: " + source);
      if(basename(source) === "index.html") {
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
      // console.log("load: " + id);
      if(id === 'index.html') {
        return GenerateIndex("", "", `<script type="module" src="/@greenjs-entry-client.jsx"></script>`);
      }
      if(id === 'entry-client.jsx') {
        return GenerateEntryClient();
      }
      if(id === 'entry-server.jsx') {
        return GenerateEntryServer();
      }
    },
    async configureServer(server): Promise<() => void> {
      const proxy = upstreamAddr ? createProxyMiddleware({target: upstreamAddr, changeOrigin: true}) : undefined;

      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!isKnownRoute || !await isKnownRoute(req.originalUrl || req.url || "")) {
            //for requests to get to this middleware but not be a route, they're legitimate 404s or for the upstream
            if(proxy) {
              req.url = req.originalUrl;
              // @ts-ignore
              proxy(req, res, next);
              return;
            } else {
              next();
              return;
            }
          }

          let html = await server.pluginContainer.load("index.html");
          html = await server.transformIndexHtml("index.html", String(html), req?.originalUrl)
          return send(req, res, html, 'html', {
            headers: server.config.server.headers
          })
        })
      }
    }
  }
}
