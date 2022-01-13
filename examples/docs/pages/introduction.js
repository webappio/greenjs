import React from "react";
import {Head} from "@greenio/head";
import Markdown from "markdown-to-jsx";
import { CONTENT } from "./docs/introduction";

const Introduction = () => {
    return <div>
        <Head>
            <title>Introduction | Template Documentation</title>
        </Head>
        <div>
            {
                CONTENT.map((cont, index) => (
                    <Markdown key={`${cont.name}_${index}`}>
                        {cont.content}
                    </Markdown>
                ))
            }
        </div>
    </div>
}

export default Introduction;