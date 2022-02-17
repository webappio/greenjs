oclif-hello-world
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
greenjs/2.0.0 linux-x64 node-v16.13.2
$ greenjs --help [COMMAND]
USAGE
  $ greenjs COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`greenjs hello PERSON`](#greenjs-hello-person)
* [`greenjs hello world`](#greenjs-hello-world)
* [`greenjs help [COMMAND]`](#greenjs-help-command)
* [`greenjs plugins`](#greenjs-plugins)
* [`greenjs plugins:inspect PLUGIN...`](#greenjs-pluginsinspect-plugin)
* [`greenjs plugins:install PLUGIN...`](#greenjs-pluginsinstall-plugin)
* [`greenjs plugins:link PLUGIN`](#greenjs-pluginslink-plugin)
* [`greenjs plugins:uninstall PLUGIN...`](#greenjs-pluginsuninstall-plugin)
* [`greenjs plugins update`](#greenjs-plugins-update)

## `greenjs hello PERSON`

Say hello

```
USAGE
  $ greenjs hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/ColinChartier/hello-world/blob/v2.0.0/dist/commands/hello/index.ts)_

## `greenjs hello world`

Say hello world

```
USAGE
  $ greenjs hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

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

## `greenjs plugins`

List installed plugins.

```
USAGE
  $ greenjs plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ greenjs plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `greenjs plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ greenjs plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ greenjs plugins:inspect myplugin
```

## `greenjs plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ greenjs plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ greenjs plugins add

EXAMPLES
  $ greenjs plugins:install myplugin 

  $ greenjs plugins:install https://github.com/someuser/someplugin

  $ greenjs plugins:install someuser/someplugin
```

## `greenjs plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ greenjs plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ greenjs plugins:link myplugin
```

## `greenjs plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ greenjs plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ greenjs plugins unlink
  $ greenjs plugins remove
```

## `greenjs plugins update`

Update installed plugins.

```
USAGE
  $ greenjs plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
