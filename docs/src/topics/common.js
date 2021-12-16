import React from "react";
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {Link} from "@greenio/router";
import {Drawer} from "@mui/material";

function HideOnScroll({children}) {
    const slideTrigger = useScrollTrigger({});

    return (
        <Slide appear={false} direction="down" in={!slideTrigger}>
            {children}
        </Slide>
    );
}

const drawerWidth = 240;

function DocBase({children}) {
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    return <div className="flex">
        <HideOnScroll>
            <AppBar
                color="inherit"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
                className="border-b-2 border-slate-200"
                elevation={0}
            >
                <div className="container flex mx-6 my-3 justify-between">
                    <Link href="/"><img src="/static/images/Logo.svg" alt="GreenJS logo" width="96" height="48"/></Link>
                    <div className="flex text-lg font-bold uppercase">
                        <input type="text" className="border border-slate-200 rounded-md px-2 grow shrink" placeholder="Search..."/>
                        <a href="https://join.slack.com/t/greenjs/shared_invite/zt-109by8mrn-p9gbRlSovBXvoM_5VZn31g" className="ml-8 hidden md:flex hover:underline">
                            Community
                        </a>
                    </div>
                </div>
            </AppBar>
        </HideOnScroll>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
        >

        </Drawer>
        <div className="flex flex-col">
            <div className="p-6">&nbsp;</div>
            {children}
        </div>
    </div>
}

export {DocBase}