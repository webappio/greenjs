import React from "react";
import {DocBase, DocCmd, DocLink} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Vite vs GreenJS</h1>
        <p><DocLink href="https://vitejs.dev/guide/#overview">Vite</DocLink> is similar in many ways to GreenJS, but different in others:</p>
        <ul className="list-disc space-y-2 mt-2 ml-4">
            <li>Vite is a general tool for many frameworks (e.g., Vue, React, and Svelte), while GreenJS is built specifically for React sites.</li>
            <li>Both frameworks use <DocLink href="https://esbuild.github.io/">ESBuild</DocLink> to bundle javascript files, Vite uses ESBuild with <DocLink href="https://rollupjs.org/guide/en/">RollUp</DocLink>, which is more configurable, but slightly less performant.</li>
            <li>Vite does not come with a first-class <DocCmd>&lt;Link></DocCmd> component, which means features like "pre-download the page when I hover over the link" are not available.</li>
            <li>Vite does not pre-render routes like blog.js into blog.html, though it has <DocLink href="https://vitejs.dev/guide/ssr.html#example-projects">experimental server-side rendering</DocLink> support.</li>
            <li>Vite encourages users to edit templated <DocCmd>page.html</DocCmd> files, while GreenJS encourages a javascript-only approach with a <DocCmd>&lt;Router></DocCmd> element.</li>
            <li>Both frameworks support javascript, JSX, CSS, and other file types.</li>
            <li>Code splitting - both frameworks will split large javascript files and libraries automatically to improve page performance.</li>
            <li>Auto reloading - Vite supports hot module reloading, while GreenJS has an automatically-added sidebar to reload the page on file changes.</li>
            <li>We recommend users try both: <DocCmd>npm init vite@latest</DocCmd> for vite, and <DocCmd>npx create-greenjs-app</DocCmd> for GreenJS.</li>
        </ul>
    </DocBase>
}