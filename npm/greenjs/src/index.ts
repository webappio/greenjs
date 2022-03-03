#!/usr/bin/env node

import ParseFlags from 'minimist';
import Build from "./commands/build.js";
import Start from "./commands/start.js";

const {_: args, ...flags} = ParseFlags(process.argv.slice(2))
if(args.length === 1 && args[0] === "build") {
    (new Build()).run().catch(x => console.error(x));
} else if (args.length === 1 && args[0] === "start") {
    (new Start()).run(flags["upstream-addr"]).catch(x => console.error(x));
} else {
    console.error("Usage: greenjs [build|start]")
}