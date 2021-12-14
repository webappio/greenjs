import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Page() {
    return <div>
        <h1>The GreenJS Router</h1>
        <h3>Examples</h3>
        <h5>Route to a page if possible</h5>
        <SyntaxHighlighter language="javascript" style={docco}>{`
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
}`}</SyntaxHighlighter>

        <h5>Follow-up to example above, getting path attributes for the current route</h5>
        <SyntaxHighlighter language="javascript" style={docco}>{`
import {useRoute} from "@greenio/router";
export default function DocPage() {
  //params: /docs/:page -> page is a param
  const {params} = useRoute();
  return <div>
    Current doc page is {params.page}, query params are: {Object.keys(query).join(", ")}
    Path is: {params.path}
  </div>
}`}</SyntaxHighlighter>

        <h5>Using async import to split javascript bundles</h5>
        <SyntaxHighlighter language="javascript" style={docco}>{`
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
}`}</SyntaxHighlighter>
    </div>
}