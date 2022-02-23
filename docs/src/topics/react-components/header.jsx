import React from "react";
import {Code, DocBase, DocCmd} from "../base-doc-page";
import {Link} from "@greenio/router";
import {Head} from "@greenio/head";

export default function Page() {
    return <DocBase>
        <Head>
            <title>The GreenJS Head Component</title>
        </Head>
        <h1 className="font-bold text-2xl mb-4">The GreenJS &lt;Head> tag</h1>
        <h3 className="font-bold text-lg my-2">Installation</h3>
        <DocCmd>npm install --save @greenio/head</DocCmd>
        <h3 className="font-bold text-lg mt-6 mb-2">The &lt;Head> tag for these docs</h3>
        <Code>{`
<Head>
    <title>GreenJS Docs</title>
    <meta name="cache-control" content="public" />
    <link rel="stylesheet" href="/App.css" />
    <link rel="stylesheet" href="/Site.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-8QM8LHVH3P" />
    <script>{\`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-8QM8LHVH3P');
    \`}
    </script>
</Head>
`}</Code>
        <h3 className="font-bold text-lg mt-6 mb-2">&lt;Head> tags can be nested</h3>
        <p className="my-2">
            If you use the <Link href="/docs/router">Route</Link> component,
            you can override the &lt;Head> tag of the parent component with the inner component.
            For example, this specific page has the following code:</p>
        <Code>{`
<Head>
    <title>The GreenJS Head Component</title>
</Head>
        `}</Code>
        <p className="my-2">
            When you navigate away from this page, the &lt;Head> element above will be unrendered,
            so the title of the page will change.
        </p>
    </DocBase>
}
