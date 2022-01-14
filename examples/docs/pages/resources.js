import React from "react";
import { Head } from "@greenio/head";
import { CONTENT } from "./docs/resources";
import Markdown from "markdown-to-jsx";

const Resources = () => {
    return <div>
        <Head>
            <title>Resources | Template Documentation</title>
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

export default Resources;