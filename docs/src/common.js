import React from "react";
import {Link} from "@greenio/router";

export function Navbar() {
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


export function Footer() {
    return <div className="bg-[#113118] text-white self-stretch p-4 py-6 md:p-6 md:py-12 flex justify-center">
        <div className="container flex flex-col">
            <img src="/static/images/Logo-white.svg" alt="GreenJS logo" width="128" height="64"/>
            <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col items-start sm:basis-1/2 my-5">
                    <h5 className="uppercase text-slate-200 mb-1">Docs</h5>
                    <Link href="/docs/basics" className="text-white hover:underline">The basics</Link>
                    <Link href="/docs/installation" className="text-white hover:underline">Installation</Link>
                    <Link href="/docs/examples" className="text-white hover:underline">Examples</Link>
                    <Link href="/docs/core-concepts" className="text-white hover:underline">Core concepts</Link>
                </div>
                <div className="flex flex-col items-start basis-full sm:basis-1/2 my-5">
                    <h5 className="uppercase text-slate-200 mb-1">Comparisons</h5>
                    <Link href="/docs/intro" className="text-white hover:underline">NextJS</Link>
                    <Link href="/docs/create-react-app-comparison" className="text-white hover:underline">create-react-app</Link>
                </div>
            </div>
            <div className="flex justify-between text-right text-sm border-t-2 pt-5 mt-2 border-slate-200">
                <a href="https://github.com/webappio/greenjs">
                    <img src="/static/images/github.svg" alt="View GitHub repository" width="40" height="40"
                         className="pr-4 invert"/>
                </a>
                ©2021 Colin Chartier and the GreenJS authors
            </div>
        </div>
    </div>
}