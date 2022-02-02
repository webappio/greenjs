import React from "react";
import {Link} from "@greenio/router";

export function Navbar() {
    return <div className="container flex p-2 py-6 md:p-6 justify-between">
        <Link href="/" className="flex-basis-[80px] md:flex-basis-[128px] grow-0 shrink-0 mx-2 md:mx-8">
            <img src="/static/images/Logo.svg" alt="GreenJS logo" width="128" height="64" className="w-full h-auto"/>
        </Link>
        <div className="flex text-lg font-bold uppercase items-center">
            <Link
                className="mx-2 md:mx-8 hover:underline"
                href="/docs/getting-started">Docs</Link>
            <a className="mx-2 md:mx-8 hover:underline"
               href="https://join.slack.com/t/webappdevelopers/shared_invite/zt-12tklqflc-7y~sYb7K3kkLyqY_hHofXg">Community</a>
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
                    <Link href="/docs/why" className="text-white hover:underline">Why GreenJS</Link>
                    <Link href="/docs/getting-started" className="text-white hover:underline">Getting started</Link>
                    <Link href="/docs/hosting" className="text-white hover:underline">Hosting</Link>
                    <Link href="/docs/examples" className="text-white hover:underline">Examples</Link>
                </div>
                <div className="flex flex-col items-start basis-full sm:basis-1/2 my-5">
                    <h5 className="uppercase text-slate-200 mb-1">Comparisons</h5>
                    <Link href="/docs/nextjs-comparison" className="text-white hover:underline">NextJS vs GreenJS</Link>
                    <Link href="/docs/vite-comparison"
                          className="text-white hover:underline">Vite vs GreenJS</Link>
                </div>
            </div>
            <div className="flex text-sm border-t-2 pt-5 mt-2 border-slate-200 space-x-4">
                <a href="https://github.com/webappio/greenjs">
                    <img src="/static/images/github.svg" alt="GreenJS GitHub" width="20" height="20"
                         className="invert"/>
                </a>
                <a href="https://twitter.com/greenjsio">
                    <img src="/static/images/twitter.svg" alt="GreenJS Twitter" width="20" height="20"
                         className="invert"/>
                </a>
                <a href="https://join.slack.com/t/webappdevelopers/shared_invite/zt-12tklqflc-7y~sYb7K3kkLyqY_hHofXg">
                    <img src="/static/images/slack.svg" alt="GreenJS Discord" width="20" height="20"
                         className="invert"/>
                </a>
                <div className="grow text-right">
                    ©2021 Colin Chartier and the GreenJS authors
                </div>
            </div>
        </div>
    </div>
}
