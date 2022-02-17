import {Command, Flags} from '@oclif/core'
import vite from 'vite';

export default class Start extends Command {
  static description = 'Start a development server for the project'

  static examples = [
    `$ greenjs start
Server is available at http://localhost:3000
`,
  ]

  static args = []

  async run() {
    const {args, flags} = await this.parse(Start)

    this.log(`Server is available at http://localhost:3000`)
  }
}
