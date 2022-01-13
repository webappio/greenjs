import React from "react";
import {DocBase, DocCmd, DocLink} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Why GreenJS?</h1>
        <h3 className="font-bold text-lg mb-2">GreenJS's prerendering is the perfect blend of power, development speed, and performance.</h3>
        <p className="mb-2">
            If you're developing a website with React, you have three main choices:
        </p>
        <div className="flex flex-col lg:flex-row lg:items-center my-2">
            <div className="flex flex-col">
                <h5 className="font-bold text-md mb-2">
                    1. Client-side react (such as create-react-app)
                </h5>
                <p>
                    You've likely already used <DocLink
                    href="https://github.com/facebook/create-react-app">create-react-app</DocLink> if you've worked with
                    react.
                    It's amazingly simple to build apps with, but it's slow enough to cause problems if used
                    professionally.
                    Few companies use create-react-app because Google penalizes sites that are slow to show their content.
                </p>
            </div>
            <img src="/static/images/client-side.svg" alt="Graph of client-side rendering" width="352" height="224"/>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center my-2">
            <div className="flex flex-col">
                <h5 className="font-bold text-md mb-2">
                    2. Server-side rendered react (such as NextJS)
                </h5>
                <p>
                    Server-side react was designed to be more performant, but it's generally harder to develop code with.
                    You need to write files in a certain structure, and you can't use existing APIs easily.
                </p>
            </div>
            <img src="/static/images/server-side.svg" alt="Graph of server-side rendering" width="352" height="224"/>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center my-2">
            <div className="flex flex-col">
                <h5 className="font-bold text-md mb-2">
                    3. Pre-rendered react (such as GreenJS)
                </h5>
                <p>
                    Pre-rendered react has recently become popular as an alternative to server-side rendering.
                    The idea is to visit every page with a browser when you build, save the resulting HTML, and then serve that
                    immediately when users visit your site.
                    In practice, this means it's like using create-react-app but with none of the usual performance costs.
                </p>
            </div>
            <img src="/static/images/prerendering.svg" alt="Graph of server-side rendering" width="352" height="224"/>
        </div>
        <h1 className="font-bold text-2xl mb-4 mt-8">How is GreenJS different?</h1>
        <p className="mb-2">
            GreenJS combines prerendering with several technologies in a way that's never been done before.
        </p>
        <h5 className="font-bold text-md my-2">
            GreenJS uses ESBuild, it's 100x faster than parcel, webpack, or terser. See the benchmark below.
        </h5>
        <img
            src="/static/images/esbuild-benchmark.jpg"
            alt="Benchmark showing esbuild running 100x faster than other bundlers"
            width="1189"
            height="308"
            className="height-auto mw-full p-1"
        />
        <p className="mb-2">
            If you've ever seen <DocCmd>npm run build</DocCmd> take 10+ minutes, you'll appreciate the speed up!
        </p>

        <h5 className="font-bold text-md my-2">
            GreenJS embraces good ideas from existing libraries.
        </h5>
        <p className="mb-2">
            GreenJS comes with its own versions of <DocLink href="https://www.npmjs.com/package/react-router-dom">react-router-dom</DocLink>, <DocLink href="https://www.npmjs.com/package/react-helmet">react-helmet</DocLink>, and <DocLink href="https://github.com/turbolinks/turbolinks">Turbolinks</DocLink>:
        </p>
        <ul className="list-disc space-y-2 mt-2 ml-4">
            <li><DocCmd>@greenio/router</DocCmd> allows you to create routes in Javascript, without needing to configure ExpressJS or putting your files in a specific directory.</li>
            <li><DocCmd>@greenio/head</DocCmd> lets you change the &lt;head /> attribute of your site directly from React, it lets you write exclusively JavaScript, without needing to write any HTML.</li>
            <li><DocCmd>@greenio/router</DocCmd> contains a Link component that will pre-download the content of a page when you mouse over its link.</li>
        </ul>

        <h5 className="font-bold text-md my-2">
            Developer experience comes first.
        </h5>
        <p className="mb-2">
            GreenJS embeds a configurable toolbar into your site, which allows you to set up autoreloading when you save files.
        </p>

        <h5 className="font-bold text-md my-2">
            Production ready with a high-performance webserver.
        </h5>
        <p className="mb-2">
            Once you've built your application, all you have to do is <DocCmd>./dist/GreenJSServer</DocCmd> and you have a production-ready copy of your app.
        </p>

        <h5 className="font-bold text-md mt-4 mb-2">
            Want to learn more?
        </h5>
        <DocLink className="mt-2" href="/docs/getting-started">Learn how to get started with GreenJS</DocLink>
    </DocBase>
}