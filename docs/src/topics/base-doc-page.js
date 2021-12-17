import React from "react";
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {Link} from "@greenio/router";
import {Drawer} from "@mui/material";
import {Spin as Hamburger} from 'hamburger-react'

function HideOnScroll({children}) {
    const slideTrigger = useScrollTrigger({});

    return (
        <Slide appear={false} direction="down" in={!slideTrigger}>
            {children}
        </Slide>
    );
}

const drawerWidth = 240;

function SidebarLink({children, ...props}) {
    return <Link
        className="border-transparent hover:border-blue-500 border-l-2 mb-1 pl-4"
        activeClassName="border-blue-300 font-bold text-blue-500"
        {...props}
    >{children}</Link>
}

function Sidebar() {
    return <div className="pt-[6rem] w-full">
        <div className="px-3 d-flex pb-8 max-h-[calc(100vh-6rem)] w-full overflow-y-auto">
            <h3 className="text-md font-bold">Getting Started</h3>
            <div className="border-l-2 border-slate-200 mt-2 mb-8 ml-1 flex flex-col">
                <SidebarLink href="/docs/getting-started">The basics</SidebarLink>
                <SidebarLink href="/docs/installation">Installation</SidebarLink>
                <SidebarLink href="/docs/examples">Examples</SidebarLink>
                <SidebarLink href="/docs/core-concepts">Core Concepts</SidebarLink>
            </div>

            <h3 className="text-md font-bold">Components</h3>
            <div className="border-l-2 border-slate-200 mt-2 mb-8 ml-1 flex flex-col">
                <SidebarLink href="/docs/router">Routing</SidebarLink>
                <SidebarLink href="/docs/head">&lt;Head> Tag</SidebarLink>
            </div>

            <h3 className="text-md font-bold">Configuration</h3>
            <div className="border-l-2 border-slate-200 mt-2 mb-8 ml-1 flex flex-col">
                <SidebarLink href="/docs/esbuild">ESBuild options</SidebarLink>
                <SidebarLink href="/docs/development">Development</SidebarLink>
                <SidebarLink href="/docs/performance">Performance</SidebarLink>
                <SidebarLink href="/docs/plugins">Plugins</SidebarLink>
            </div>

            <h3 className="text-md font-bold">Integrations</h3>
            <div className="border-l-2 border-slate-200 mt-2 mb-8 ml-1 flex flex-col">
                <SidebarLink href="/docs/tailwindcss">TailwindCSS</SidebarLink>
            </div>

            <h3 className="text-md font-bold">Comparisons</h3>
            <div className="border-l-2 border-slate-200 mt-2 mb-8 ml-1 flex flex-col">
                <SidebarLink href="/docs/nextjs-comparison">NextJS</SidebarLink>
                <SidebarLink href="/docs/vite-comparison">Vite</SidebarLink>
            </div>
        </div>
    </div>
}

function DocBase({children}) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    return <div className="flex">
        <HideOnScroll>
            <AppBar
                color="inherit"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                className="border-b-2 border-slate-200"
                elevation={0}
            >
                <div className="flex my-3 justify-between">
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
                        <Link href="/"><img src="/static/images/Logo.svg" alt="GreenJS logo" width="96" height="48"
                                            className="w-auto h-full pl-4"/></Link>
                    </div>
                    <div className="flex text-lg font-bold uppercase items-center pr-8">
                        {/*<input type="text" className="border border-slate-200 rounded-md px-2 grow shrink" placeholder="Search..."/>*/}
                        <a href="https://join.slack.com/t/greenjs/shared_invite/zt-109by8mrn-p9gbRlSovBXvoM_5VZn31g"
                           className="ml-8 hidden md:flex hover:underline">
                            Community
                        </a>
                        <a href="https://github.com/webappio/greenjs">
                            <img src="/static/images/github.svg" alt="View GitHub repository" width="24" height="24"
                                 className="w-auto h-full pl-4"/>
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
                    overflowY: "visible",
                },
            }}
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            className="md:hidden"
        >
            <Sidebar/>
        </Drawer>
        <div className="hidden md:flex w-[240px]">
            <Sidebar/>
        </div>
        <div className="flex flex-col pt-28 px-4 sm:px-8 md:px-12 container">
            {children}
        </div>
    </div>
}

export {DocBase}