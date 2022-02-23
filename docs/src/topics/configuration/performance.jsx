import React from "react";
import {Code, DocBase, DocCmd, DocLink} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Tuning configuration for build speed</h1>
        <p className="my-2">
            You can make GreenJS preload links by using the <DocLink href="/docs/router">Route and Link</DocLink> components.
        </p>
        <p className="my-2">
            When you mouse over the links in the sidebar, if they correspond to a <DocCmd>&lt;Route></DocCmd> with the <DocCmd>asyncPage</DocCmd> attribute set, your browser will download the corresponding page. Look at the following example:
        </p>
        <Code>{`
<Router>
    <Route path="/" asyncPage={() => import("./pages/index")} />
    <Route path="/docs/*page" asyncPage={() => import("./pages/docs")} />
</Router>
<Link href="/docs/hello">View docs</Link>
`}
        </Code>
        <p className="my-2">
            In the example above, neither <DocCmd>./pages/index.js</DocCmd> nor <DocCmd>./pages/docs.js</DocCmd> are sent when you first visit the site.
            When you mouse over the "View docs" link, GreenJS detects that you are about to visit the &let;Route> which corresponds to the file <DocCmd>./pages/docs</DocCmd>, and predownloads the file.
            That means that when you visit the page, it's already been downloaded.
        </p>
    </DocBase>
}