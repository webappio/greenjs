import {Command, Flags} from '@oclif/core'
import {createServer} from 'vite'
import react from '@vitejs/plugin-react';
import GreenJSEntryPlugin from "../greenjs-entry-plugin";


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
    const server = await createServer({
      plugins: [
        react(),
        GreenJSEntryPlugin(),
      ],
      publicDir: "dist",
      server: {
        host: flags.host,
      }
    });
    await server.listen();
    server.printUrls();
  }
}
