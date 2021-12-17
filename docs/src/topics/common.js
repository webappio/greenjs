import React from "react";
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {Link} from "@greenio/router";
import {Drawer} from "@mui/material";
import { Spin as Hamburger } from 'hamburger-react'

function HideOnScroll({children}) {
    const slideTrigger = useScrollTrigger({});

    return (
        <Slide appear={false} direction="down" in={!slideTrigger}>
            {children}
        </Slide>
    );
}

const drawerWidth = 240;

function Sidebar() {
    return <div className="mt-20 mx-6 d-flex">
        <h1>sidebar</h1>
    </div>
}

function DocBase({children}) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    return <div className="flex items-center">
        <HideOnScroll>
            <AppBar
                color="inherit"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}
                className="border-b-2 border-slate-200"
                elevation={0}
            >
                <div className="container flex mx-6 my-3 justify-between">
                    <div className="flex">
                        <div className="md:hidden mr-3">
                            <Hamburger
                                toggled={drawerOpen}
                                toggle={x => setDrawerOpen(x)}
                                label="expand sidebar"
                                distance="sm"
                                size={20}
                            />
                        </div>
                        <Link href="/"><img src="/static/images/Logo.svg" alt="GreenJS logo" width="96" height="48" className="w-auto h-full"/></Link>
                    </div>
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
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            className="md:hidden"
        >
            <Sidebar />
        </Drawer>
        <div className="hidden md:flex w-[240px]">
            <Sidebar />
        </div>
        <div className="flex flex-col pt-28 px-4 sm:px-8 md:px-12 container">
            {children}
        </div>
    </div>
}

export {DocBase}