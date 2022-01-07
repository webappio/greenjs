import React from "react";
import {DocBase, DocLink} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Examples</h1>
        <div className="flex flex-col space-y-2">
            <DocLink href="https://github.com/webappio/greenjs/tree/master/examples/hello-world-react">
                A very simple 'hello world' app
            </DocLink>
            <DocLink href="https://github.com/webappio/greenjs/tree/master/docs">
                The GreenJS docs themselves
            </DocLink>
        </div>


    </DocBase>
}