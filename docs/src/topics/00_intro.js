import React from "react";
import {Link} from "@greenio/router";
import {DocBase} from "./common";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold">Getting started with GreenJS</h1>
        <p>{new Array(1000).fill("work in progress").join(" ")}</p>
    </DocBase>
}