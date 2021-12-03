import React from "react";
import {Link} from "../router";

const Index = () => {
    return <div>
        <h1>Index</h1>
        <Link href={"/pricing"}>Pricing</Link>
    </div>
}

export default Index;