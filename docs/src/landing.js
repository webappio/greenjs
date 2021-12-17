import React from "react";
import {Head} from "@greenio/head";
import {Link} from "@greenio/router";

function Navbar() {
    return <div className="container flex p-2 py-6 md:p-6 justify-between">
        <Link href="/" className="flex-basis-[128px] grow-0 shrink-0 mx-2 md:mx-8">
            <img src="/static/images/Logo.svg" alt="GreenJS logo" width="128" height="64"/>
        </Link>
        <div className="flex text-lg font-bold uppercase items-center">
            <Link
                className="mx-2 md:mx-8 hover:underline"
                href="/docs/intro">Docs</Link>
            <a className="mx-2 md:mx-8 hover:underline"
               href="https://join.slack.com/t/greenjs/shared_invite/zt-109by8mrn-p9gbRlSovBXvoM_5VZn31g">Community</a>
            <a className="mx-2 md:mx-8 hover:underline hidden md:block"
               href="https://github.com/webappio/greenjs">GitHub</a>
        </div>
    </div>
}

function Footer() {
    return <div className="bg-[#113118] text-white self-stretch p-4 py-6 md:p-6 md:py-12 flex justify-center">
        <div className="container flex flex-col">
            <img src="/static/images/Logo-white.svg" alt="GreenJS logo" width="128" height="64"/>
            <div className="my-5 columns-2">
                <div className="flex flex-col items-start">
                    <h5 className="uppercase text-slate-200">Examples</h5>
                    <Link href="/docs/intro/marketing" className="text-white hover:underline">Full-stack apps</Link>
                    <Link href="/docs/intro/ecommerce" className="text-white hover:underline">E-commerce</Link>
                    <Link href="/docs/intro/static" className="text-white hover:underline">Blog</Link>
                    <Link href="/docs/intro/docs" className="text-white hover:underline">Doc site</Link>
                </div>
                <div className="flex flex-col items-start">
                    <h5 className="uppercase text-slate-200">Docs</h5>
                    <Link href="/docs/intro" className="text-white hover:underline">Introduction</Link>
                    <Link href="/docs/routing" className="text-white hover:underline">Routing</Link>
                    <Link href="/docs/head" className="text-white hover:underline">&lt;Head> tag</Link>
                    <Link href="/docs/details" className="text-white hover:underline">Implementation details</Link>
                </div>
            </div>
            <div className="text-right text-sm border-t-2 pt-5 mt-2 border-slate-200">
                ©2021 Colin Chartier and the GreenJS authors
            </div>
        </div>
    </div>
}

function InstallStep({imgElement, title, children, hideBar}) {
    return <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-start my-20 lg:my-0">
        <div className="flex my-12 lg:basis-6/12 justify-end">
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
        <div className="container flex flex-col my-8 items-center mx-6 max-w-full md:max-w-[75%] md:my-20 lg:my-32">
            <h1 className="text-4xl font-bold text-center"><span className="bg-gradient-to-br bg-clip-text text-transparent from-green-500 to-green-600">Blazingly</span> fast pre-rendered React sites</h1>
            <p className="text-3xl text-center my-12">GreenJS makes sites load faster by sending content before any javascript loads.</p>
            <Link
                href="/docs/intro"
                className="flex items-center justify-center text-white
                bg-gradient-to-br from-green-600 to-green-700 rounded-lg py-3 px-5 text-3xl
                hover:from-green-800 hover:to-green-1000"
            >
                <img src="/static/images/book-open.svg" height="30" width="30" alt="" className="mr-4"/> Read the Docs
            </Link>
        </div>
        <div className="container flex flex-col my-20 items-center mx-6">
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