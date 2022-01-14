import React from "react";
import {DocBase, DocLink} from "../base-doc-page";


const EXAMPLES = [
    {
        Name: "Docs",
        Description: "A Docs template that uses markdown files. Use this template to build a quick documentation page for your business.",
        Src: "https://raw.githubusercontent.com/webappio/assets/main/greenjs-example-docs.png",
        Alt: "Screenshot of Docs Template Page",
        Command: "npx create-greenjs-app --template=docs",
        Link: "https://github.com/webappio/greenjs/tree/master/examples/docs",
    },
    {
        Name: "Profile",
        Description: "A profile template to showcase your projects. This includes a dark mode!",
        Src: "https://raw.githubusercontent.com/webappio/assets/main/greenjs-example-profile.png",
        Alt: "Screenshot of Profile Template Page",
        Command: "npx create-greenjs-app --template=profile",
        Link: "https://github.com/webappio/greenjs/tree/master/examples/profile"
    },
    {
        Name: "SaaS Landing Page",
        Description: "A template for your SaaS product which includes a section for features, testimonials, and various pictures.",
        Src: "https://raw.githubusercontent.com/webappio/assets/main/greenjs-example-saas.png",
        Alt: "Screenshot of SaaS Landing Template Page",
        Command: "npx create-greenjs-app --template=saas-landing",
        Link: "https://github.com/webappio/greenjs/tree/master/examples/saas-landing"
    },
]

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">Examples</h1>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignContent: "start",
                flexWrap: "wrap",
            }}
        >
            {
                EXAMPLES.map((ex) => (
                    <div
                    style={{
                        width: "400px",
                        height: "300px",
                        margin: "20px 40px 60px 0px",
                    }}
                    >
                        <img 
                        style={{
                            width: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                            marginBottom: "20px",
                        }}
                        src={ex.Src} alt={ex.Alt} />
                        <h3 className="font-bold text-xl mb-2">{ex.Name}</h3>
                        <p className="mb-2">{ex.Description}</p>
                        <h3>Command to Install:</h3>
                        <p className="font-bold mb-2">{ex.Command}</p>
                        <DocLink href={ex.Link}>
                            View on GitHub
                        </DocLink>
                    </div>
                ))
            }
        </div>
        <div className="flex flex-col space-y-2" style={{ marginTop: "120px" }}>
            <h1 className="font-bold text-xl mb-2">More Examples:</h1>
            <DocLink href="https://github.com/webappio/greenjs/tree/master/examples/hello-world-react">
                A very simple 'hello world' app
            </DocLink>
            <DocLink href="https://github.com/webappio/greenjs/tree/master/docs">
                The GreenJS docs themselves
            </DocLink>
        </div>
    </DocBase>
}