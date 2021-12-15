import React from "react";
import {Head} from "@greenio/head";
import {Link} from "@greenio/router";

function Navbar() {
    return <div className="container flex m-6 justify-between">
        <Link href="/"><img src="/static/images/Logo.svg" alt="GreenJS logo" width="128" height="64"/></Link>
        <div className="flex text-lg font-bold uppercase">
            <Link href="/docs/intro" className="mx-8 hover:underline">Docs</Link>
            <a href="https://join.slack.com/t/greenjs/shared_invite/zt-109by8mrn-p9gbRlSovBXvoM_5VZn31g" className="mx-8 hover:underline">Community</a>
            <a href="https://github.com/webappio/greenjs" className="ml-8 hover:underline">GitHub</a>
        </div>
    </div>
}

function Footer() {
    return <div className="bg-[#113118] text-white self-stretch py-5 flex justify-center">
        <div className="container flex flex-col">
            <img src="/static/images/Logo white.svg" alt="GreenJS logo" width="128" height="64"/>
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
            <div className="text-right">
                ©2021 Colin Chartier and the GreenJS authors
            </div>
        </div>
    </div>
}

export default function Landing() {
    return <main className="flex flex-col items-center">
        <Head>
            <title>Prerendering react sites with esbuild | Better SEO without added complexity | GreenJS</title>
        </Head>
        <Navbar />
        <div className="container flex flex-col my-16 items-center">
            <h1 className="text-3xl font-bold text-center">Blazingly fast pre-rendered frontends for React</h1>
            <p className="text-xl text-center mt-6 mb-10">GreenJS speeds up React sites by prerendering them with esbuild.</p>
            <Link
                href="/docs/intro"
                className="flex items-center justify-center text-white
                bg-gradient-to-r from-green-600 to-green-700 rounded-lg py-2 px-4 text-2xl
                hover:from-green-800 hover:to-green-900"
            >
                <img src="/static/images/book-open.svg" alt="" className="mr-2"/> Read the Docs
            </Link>
        </div>
        <Footer />
    </main>
}