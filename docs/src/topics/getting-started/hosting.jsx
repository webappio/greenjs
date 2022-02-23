import React from "react";
import {DocBase} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Hosting GreenJS websites</h1>
        <p>There are many ways to host a GreenJS website, but if you're just getting started we recommend one of the following:</p>
        <h1 className="font-bold text-lg mt-4">Simpler options with worse performance</h1>
        <ol>
            <li>Github Pages</li>
            <li>Netlify</li>
            <li>GitLab Pages</li>
        </ol>
        <h1 className="font-bold text-lg mt-4">More involved options with better performance</h1>
        <ol>
            <li>Docker</li>
            <li>Kubernetes</li>
        </ol>
    </DocBase>
}