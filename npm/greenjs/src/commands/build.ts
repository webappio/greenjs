import {Command, Flags} from '@oclif/core'

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

    this.log(`Source has been written to the dist/ folder!`)
  }
}
