import React from "react";
import {Head} from "@greenio/head";
import {Link} from "@greenio/router";
import {Footer, Navbar} from "./common";

function InstallStep({imgElement, title, children, hideBar}) {
    return <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-start my-10 sm:my-20 lg:my-0">
        <div className="flex my-6 sm:my-12 lg:basis-6/12 justify-end">
            <div className="max-w-[500px] shrink grow flex">
            {imgElement}
            </div>
        </div>
        <div className="self-stretch hidden lg:flex flex-col items-center mr-8 mr-lg-16 ml-lg-8">
            <div className="border-solid border-4 border-slate-200 rounded-full p-3"/>
            {hideBar ? null : <div className="border-dashed border-r-[6px] border-slate-200 shrink-0 grow"/>}
        </div>
        <div className="flex flex-col lg:basis-6/12 shrink">
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <p className="text-xl">
                {children}
            </p>
        </div>
    </div>
}

function IndexCard({title, logoImg, children}) {
    return <div className="flex flex-col items-center text-center w-full md:text-left md:items-start p-4 py-8 lg:p-6">
        {logoImg}
        <h3 className="text-xl font-bold my-2">{title}</h3>
        <p className="text-lg">
            {children}
        </p>
    </div>
}

export default function Landing() {
    return <main className="flex flex-col items-center">
        <Head>
            <title>Faster React sites without added complexity | GreenJS</title>
        </Head>
        <Navbar />
        <div className="container flex flex-col my-8 items-center px-6 max-w-full md:max-w-[75%] md:my-20 lg:my-32">
            <h1 className="text-4xl font-bold text-center">Add performant React pages to an existing site</h1>
            <p className="text-3xl text-center my-12">GreenJS combines esbuild, Go, and prerendering into a great developer experience for React users.</p>
            <div className="flex space-x-6">
                <Link
                    href="/docs/getting-started"
                    className="flex items-center justify-center text-white text-center
                    bg-gradient-to-br from-green-600 to-green-700 rounded-lg  p-3 md:px-5 text-2xl
                    hover:from-green-500 hover:to-green-600"
                >
                    Get Started
                </Link>
                <Link
                    href="/docs/why"
                    className="flex items-center justify-center text-green-600 text-center
                    bg-white border border-green-500 rounded-lg p-3 md:px-5 text-lg md:text-2xl
                    hover:bg-gradient-to-br from-green-500 to-green-600 hover:text-white"
                >
                    Learn More
                </Link>
            </div>
        </div>
        <div className="container flex flex-col md:flex-row justify-center md:space-x-8 md:columns-3 m-8 md:mx-12 lg:mx-20">
            <IndexCard
                title="Build faster with a familiar interface"
                logoImg={<img src="/static/images/book.svg" width="26" height="26"/>}
            >
                Iterate without reading our docs, the GreenJS &lt;Router> and &lt;Link> elements are already familiar to most React developers.
            </IndexCard>
            <IndexCard
                title="'npm build' is 10x faster"
                logoImg={<img src="/static/images/fast-forward.svg" width="26" height="26"/>}
            >
                GreenJS is written entirely in Go, and uses esbuild to finish builds in milliseconds instead of minutes.
            </IndexCard>
            <IndexCard
                title="Add react components to existing sites"
                logoImg={<img src="/static/images/upload-cloud.svg" width="26" height="26"/>}
            >
                The GreenJS production webserver can act as a proxy to forward traffic to an existing site effortlessly.
            </IndexCard>
        </div>
        <div className="container flex flex-col px-6 mt-16 md:mt-20 items-center mx-6">
            <h5 className="uppercase font-bold bg-gradient-to-br bg-clip-text text-transparent from-green-500 to-green-600 text-3xl mt-20 mb-10 lg:mt-40 lg:mb-96">How to Get Started</h5>
            <InstallStep
                imgElement={<img src="/static/images/react-code.svg" width="270" height="335" alt="Sample of React code" className="w-full h-auto lg:-translate-y-80"/>}
                title="1. Write React code like you usually would"
            >
                Instead of using complex file-based routing, use routes directly within React to define pages.
                GreenJS comes with drop-in replacements for react-helmet, react-router and react-dom.
            </InstallStep>
            <InstallStep
                imgElement={<img src="/static/images/dist-folder-example.svg" width="270" height="198" alt="Sample file structure of dist folder" className="w-full h-auto lg:-translate-y-60"/>}
                title="2. Run greenjs build to prerender your site"
            >
                At build-time, we’ll discover all of your routes. We’ll use a headless browser to visit all of your pages and run your React code. The resulting pages will be saved as HTML.
            </InstallStep>
            <InstallStep
                imgElement={<img src="/static/images/host-your-site.svg" width="270" height="234" alt="Visualization of uploading dist.zip" className="w-full h-auto lg:-translate-y-60 mt-28"/>}
                title="3. Host your site as you usually would"
                hideBar
            >
                GreenJS automatically emits a high performance webserver in the dist folder to distribute the entire application with ease.
            </InstallStep>
        </div>
        <div className="container flex flex-col px-6 my-16 lg:mt-0 md:mb-20 items-center mx-6 space-y-6">
            <h1 className="text-2xl font-bold text-center">Ready to add performant React pages to your site?</h1>
            <Link
                href="/docs/getting-started"
                className="flex items-center justify-center text-white text-center
                    bg-gradient-to-br from-green-600 to-green-700 rounded-lg  p-3 md:px-5 text-2xl
                    hover:from-green-500 hover:to-green-600"
            >
                Get Started
            </Link>
        </div>
        <Footer />
    </main>
}