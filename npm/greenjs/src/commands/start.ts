import {Command, Flags} from '@oclif/core'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react';
import GreenJSEntryPlugin from "../greenjs-entry-plugin";
import {GenerateEntryServer} from "../resources";


export default class Start extends Command {
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

  static flags = {
    host: Flags.string({char: 'h', description: 'Which address to listen to', required: false}),
  };

  async run() {
    const {args, flags} = await this.parse(Start)
    const knownRoutes = new Set();
    let checkKnownRoute: (route: string) => Promise<void> = async route => {};
    let isKnownRoute = async (route: string) => {
      await checkKnownRoute(route);
      return knownRoutes.has(route); //TODO :param and *param
    };
    const server = await createServer({
      plugins: [
        react(),
        GreenJSEntryPlugin(isKnownRoute),
      ],
      publicDir: "dist",
      server: {
        host: flags.host,
      },
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
    })().catch(x => console.error(x));
    await server.listen();
    server.printUrls();
  }
}
