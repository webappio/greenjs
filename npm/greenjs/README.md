greenjs
=================

GreenJS CLI

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g greenjs
$ greenjs COMMAND
running command...
$ greenjs (--version)
greenjs/2.0.9 linux-x64 node-v16.13.2
$ greenjs --help [COMMAND]
USAGE
  $ greenjs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`greenjs build`](#greenjs-build)
* [`greenjs help [COMMAND]`](#greenjs-help-command)
* [`greenjs start`](#greenjs-start)

## `greenjs build`

Make a production build of the project

```
USAGE
  $ greenjs build [-f <value>]

FLAGS
  -f, --from=<value>  Whom is saying hello

DESCRIPTION
  Make a production build of the project

EXAMPLES
  $ greenjs build
  Source has been written to the dist/ folder!
```

_See code: [dist/commands/build.ts](https://github.com/ColinChartier/hello-world/blob/v2.0.9/dist/commands/build.ts)_

## `greenjs help [COMMAND]`

Display help for greenjs.

```
USAGE
  $ greenjs help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for greenjs.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `greenjs start`

Start a development server for the project

```
USAGE
  $ greenjs start [-h <value>] [-p <value>] [-u <value>]

FLAGS
  -h, --host=<value>           Which address to listen to
  -p, --port=<value>           Which port to listen to
  -u, --upstream-addr=<value>  Where to forward upstream requests

DESCRIPTION
  Start a development server for the project

EXAMPLES
  $ greenjs start
  Pre-bundling dependencies:
    react-dom
    @greenio/head
    @greenio/router
    react/jsx-dev-runtime
  (this will be run only when your dependencies or config have changed)
    > Local: http://localhost:3000/
    > Network: use `--host` to expose
```

_See code: [dist/commands/start.ts](https://github.com/ColinChartier/hello-world/blob/v2.0.9/dist/commands/start.ts)_
<!-- commandsstop -->
