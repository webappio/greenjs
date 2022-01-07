import React from "react";
import {Code, DocBase, DocCmd} from "../base-doc-page";

export default function Page() {
    return <DocBase>
        <h1 className="font-bold text-2xl mb-4">GreenJS router examples</h1>
        <h3 className="font-bold text-lg my-2">Installation</h3>
        <DocCmd>npm install --save @greenio/router</DocCmd>
        <h3 className="font-bold text-lg mt-6 mb-2">Route to a page if possible</h3>
        <Code>{`
import DocPage from "./pages/docs";
import OrgDashboard from "./pages/orgdash";
import PricingPage from "./pages/pricing";
import IndexPage from "./pages/index";
import NotFoundPage from "./pages/404";
import {Route, Router} from "@greenio/router";
export default function App() {
  return <Router>
    {/* /docs/hello but not /docs/hello/world */}
    <Route path="/docs/:page"><DocPage /></Route> 
    {/* /myorg/settings and /myorg/settings/hello/world*/}
    <Route path="/:orgname/settings/*path"><OrgDashboard /></Route>
    {/* /pricing only, not /pricing/tiers */}
    <Route path="/pricing"><PricingPage /></Route> 
    {/* / but not /unknown */}
    <Route path="/"><IndexPage /></Route>
    <Route><NotFoundPage /></Route>
  </Router>
}`}</Code>

        <h3 className="font-bold text-lg mt-6 mb-2">Follow-up to example above, getting path attributes for the current route</h3>
        <Code>{`
import {useRoute} from "@greenio/router";
export default function DocPage() {
  //params: /docs/:page -> page is a param
  const {params} = useRoute();
  return <div>
    Current doc page is {params.page}, query params are: {Object.keys(query).join(", ")}
    Path is: {params.path}
  </div>
}`}</Code>

        <h3 className="font-bold text-lg mt-6 mb-2">Using async import to improve performance</h3>
        <Code>{`
import {Route, Router} from "@greenio/router";
export default function App() {
  return <Router>
    {/* /docs/hello but not /docs/hello/world */}
    <Route path="/docs/:page" asyncPage={() => import("./pages/docs")} />
    {/* /myorg/settings and /myorg/settings/hello/world*/}
    <Route path="/:orgname/settings/*path" asyncPage={() => import("./pages/orgdash")} />
    {/* /pricing only, not /pricing/tiers */}
    <Route path="/pricing" asyncPage={() => import("./pages/pricing")} />
    {/* / but not /unknown */}
    <Route path="/" asyncPage={() => import("./pages/index")} /> 
    <Route asyncPage={() => import("./pages/404")} />
  </Router>
}`}</Code>
    </DocBase>
}