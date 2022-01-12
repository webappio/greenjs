import React from "react";
import {DocBase, DocLink} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">NextJS vs GreenJS</h1>
        <p><DocLink href="https://vitejs.dev/guide/#overview">NextJS</DocLink> is both similar and different to GreenJS:</p>
        <ul className="list-disc space-y-2 mt-2 ml-4">
            <li>Both frameworks are specifically built to help users build performant React sites.</li>
            <li>GreenJS builds are faster due to its use of <DocLink href="https://esbuild.github.io/">ESBuild</DocLink> to bundle javascript files, while NextJS uses Webpack.</li>
            <li>NextJS requires users to make routes with specific files (e.g., pages/users/:id/user.js) while GreenJS does not require a specific file structure due to its familiar &lt;Router> tag.</li>
            <li>GreenJS can only currently prerender pages into HTML files, while NextJS also supports server-side rendering.</li>
            <li>NextJS has a larger community and more plugins, while GreenJS is newer.</li>
            <li>Both frameworks come with roughly interchangeable &lt;Link> and &lt;Head> tags, amongst others.</li>
            <li>GreenJS is easy to put in front of an existing site using its --upstream-addr flag.</li>
            <li>GreenJS builds come with a high-performance statically linked webserver, making them easy to deploy in cloud environments.</li>
        </ul>
    </DocBase>
}