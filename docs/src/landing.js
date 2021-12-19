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

export default function Landing() {
    return <main className="flex flex-col items-center">
        <Head>
            <title>Prerendering react sites with esbuild | Better SEO without added complexity | GreenJS</title>
        </Head>
        <Navbar />
        <div className="container flex flex-col my-8 items-center px-6 max-w-full md:max-w-[75%] md:my-20 lg:my-32">
            <h1 className="text-4xl font-bold text-center"><span className="bg-gradient-to-br bg-clip-text text-transparent from-green-500 to-green-600">Blazingly</span> fast pre-rendered React sites</h1>
            <p className="text-3xl text-center my-12">GreenJS makes sites load faster by sending content before any javascript loads.</p>
            <Link
                href="/docs/basics"
                className="flex items-center justify-center text-white
                bg-gradient-to-br from-green-600 to-green-700 rounded-lg py-3 px-5 text-3xl
                hover:from-green-800 hover:to-green-1000"
            >
                <img src="/static/images/book-open.svg" height="30" width="30" alt="" className="mr-4"/> Read the Docs
            </Link>
        </div>
        <div className="container flex flex-col px-6 mt-16 md:mt-28 items-center mx-6">
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
                At build-time, we’ll discover all of your routes. We’ll send a headless browser to visit all of your pages and run your React code. The resulting pages will be saved as HTML.
            </InstallStep>
            <InstallStep
                imgElement={<img src="/static/images/host-your-site.svg" width="270" height="234" alt="Visualization of uploading dist.zip" className="w-full h-auto lg:-translate-y-60 mt-28"/>}
                title="3. Host your site as you usually would"
                hideBar
            >
                GreenJS can be configured to emit a high performance server in the dist folder to distribute the entire application with ease.
            </InstallStep>
        </div>
        <Footer />
    </main>
}