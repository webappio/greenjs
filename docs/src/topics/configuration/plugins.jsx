import React from "react";
import {DocBase, DocCmd} from "../base-doc-page";
import {Link} from "@greenio/router";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Plugin configuration</h1>
        <p>GreenJS support <Link href="https://github.com/esbuild/community-plugins">esbuild plugins</Link></p>
        <p>To use them, add a <DocCmd>"plugins": [...]</DocCmd> block in your configuration.</p>
        <h3 className="font-bold text-lg my-2"><Link href="https://github.com/esbuild/community-plugins">Example plugins:</Link></h3>
        <ul className="list-disc space-y-2 mt-2 ml-4">
            <li><DocCmd>esbuild-plugin-sass</DocCmd> - allows you to <DocCmd>import("./file.scss")</DocCmd></li>
            <li><DocCmd>esbuild-mdx</DocCmd> renders <DocCmd>md</DocCmd> and <DocCmd>mdx</DocCmd> files.</li>
            <li><DocCmd>esbuild-plugin-svg</DocCmd> allows you to <DocCmd>import("./file.svg")</DocCmd> as a SVG component.</li>
        </ul>
    </DocBase>
}