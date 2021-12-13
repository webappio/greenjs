import React from "react";
import {Link} from "@greenio/router";

export default function Intro() {
    return <div>
        <h1>Getting started with GreenJS</h1>
        <p>Click an example below to see how to get started with GreenJS for your use-case</p>
        <Link to="/docs/intro/marketing">Marketing site for full-stack app</Link>
        <Link to="/docs/intro/ecommerce">E-commerce site (with Shopify)</Link>
        <Link to="/docs/intro/static">Personal site or blog</Link>
        <Link to="/docs/intro/static">Docs with search</Link>
    </div>
}