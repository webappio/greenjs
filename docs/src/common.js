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