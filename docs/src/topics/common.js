import React from "react";
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {Link} from "@greenio/router";

function HideOnScroll({children}) {
    const slideTrigger = useScrollTrigger({});
    const elevateTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    })

    return (
        <Slide appear={false} direction="down" in={!slideTrigger}>
            {React.cloneElement(children, {elevation: elevateTrigger ? 4 : 0})}
        </Slide>
    );
}

function DocBase({children}) {
    return <div className="flex flex-col">
        <HideOnScroll>
            <AppBar color="inherit">
                <div className="container flex m-6 justify-between">
                    <Link href="/"><img src="/static/images/Logo.svg" alt="GreenJS logo" width="128" height="64"/></Link>
                </div>
            </AppBar>
        </HideOnScroll>
        <div className="p-8">&nbsp;</div>
        {children}
    </div>
}

export {DocBase}