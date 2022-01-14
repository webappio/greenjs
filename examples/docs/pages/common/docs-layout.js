import { Divider, Toolbar, Drawer, Box, AppBar, Typography, Input, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Menu, Search, X } from "react-feather";
import { ALL_CONTENT } from "../docs/index";
import { Link } from "@greenio/router";
import getSearchResults from "../docs/docs-search";


const drawerWidth = 240;

const DocsLayout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hash, setHash] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [noSearchResult, setNoSearchResult] = useState(false);


    useEffect(() => {
        setHash(document.location.hash);
    }, []);

    useEffect(() => {
        if (!hash) return;
        if (String(hash).length === 0) return;
        const id = String(hash).split("#")[1];
        try {
            const el = document.getElementById(id);
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            setTimeout(() => window.scrollTo({ top: y, behavior: "smooth" }));
        } catch {
            return;
        }
    }, [hash])

    const checkActive = (link) => {
        const pageLink = document.location.pathname + document.location.hash;
        if (String(link).toUpperCase() === pageLink.toUpperCase()) {
            return true;
        }
        return false;
    }

    const getBoldString = (title = "", content = "", isTitle = false) => {
        let text = content.replaceAll(/(<([^>]+)>)/ig, "").replaceAll("#", "").replaceAll("*", "");
        if (isTitle) {
            text = title;
        }
        const index = text.toUpperCase().indexOf(searchQuery.toUpperCase());
        let beginString = text.substring(0, index);
        const boldString = text.substring(index, index+searchQuery.length);
        let endString = text.substring(index+searchQuery.length, text.length);
        if (!isTitle) {
            beginString = beginString.slice(-100);
            endString = endString.slice(0, 100);
        }
        return { beginString, boldString, endString };
    };

    const handleSearch = () => {
        const searchResults = getSearchResults(searchQuery);
        setSearchResults(searchResults);
        if (searchResults.length === 0) {
            setNoSearchResult(true);
        }
    }

    const drawer = (
        <div>
            <Toolbar>
                <div style={{ textAlign: "center", width: "100%", fontWeight: "bold" }}>
                    <small>LOGO PLACEHOLDER</small>
                </div>
            </Toolbar>
            <Divider />
            <div>
                {
                    ALL_CONTENT.map((cont, index) => {
                        return (
                            <div style={{ margin: "10px 5px 20px 20px" }} key={`${cont.name}_${index}`}>
                                <div onClick={() => setHash(cont.link)} style={{ paddingBottom: "10px" }}>
                                    <Link to={cont.link}>
                                        <span className="nav--link">{cont?.MAIN?.name}</span>
                                    </Link>
                                </div>
                                {
                                    cont?.CONTENT?.map((subCont, index_two) => {
                                        const isActive = checkActive(subCont.link);
                                        return (
                                            <div 
                                            style={{ paddingBottom: "8px", paddingTop: "8px" }}
                                            className={ isActive ? "nav--sublink__active" : "nav--sublink__not-active" }
                                            onClick={() => setHash(subCont.link)} key={`${subCont.name}_${index_two}`}>
                                                <Link to={subCont.link} style={{ marginLeft: "10px" }}>
                                                    <span className={`nav--sublink`}>{subCont?.name}</span>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

    const clearButton = (
        <div>
            <Button
            variant="outlined"
            color="error"
            onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
                setNoSearchResult(false);
            }} 
            endIcon={<X></X>}
            style={{ marginTop: "20px" }}
            >
                Clear
            </Button>
        </div>
    )

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="permanent"
                    sx = {{
                        display: { xs: "none", sm: "block" },
                        '& .MuiDrawer-paper': { boxSizing: "border-box", width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        '& .MuiDrawer-paper': { boxSizing: "border-box", width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box sx={{ display: "flex" }}>
                <AppBar
                    color="transparent"
                    style={{ backgroundColor: "white" }}
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` } 
                    }}
                >
                    <Toolbar>
                        <Box sx={{ display: { sm: "none" }, marginRight: "20px" }}>
                            <Menu onClick={() => setMobileOpen(!mobileOpen)} />
                        </Box>
                        <Typography variant="h6" style={{ fontWeight: "bold", color: "rgb(25, 118, 210)" }}>
                            Docs
                        </Typography>
                        <Box sx={{ marginLeft: "40px" }}>
                            <div className="flex flex-row">
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="Search Docs ..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <Button 
                                onClick={() => handleSearch()}
                                variant="outlined" style={{ marginLeft: "5px" }} size="small">
                                    <Search />
                                </Button>
                            </div>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        padding: { xs: "10px", sm: "30px" },
                        maxWidth: { xs: "100%", md: "70%" }
                    }}
                >
                    <Toolbar />
                    <div>
                    {
                        searchResults.length > 0 ?
                        <div>
                            <div>
                                {
                                    searchResults?.map((result, index) => {
                                        const {
                                            endString,
                                            beginString,
                                            boldString,
                                        } = getBoldString(result.Name, result.Content, result.IsTitle)

                                        return (
                                            <div 
                                            key={`${result.Name}_${index}`}
                                            style={{ marginBottom: "30px" }}
                                            onClick={() => {
                                                setSearchResults([]);
                                                setSearchQuery("");
                                                setHash(result.Link);
                                            }}>
                                                <Link to={result.Link}>
                                                {
                                                    result.IsTitle ?
                                                    <div>
                                                        <Typography variant="h5" style={{ fontWeight: "600" }}>
                                                            {beginString}<mark>{boldString}</mark>{endString}
                                                        </Typography>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Typography variant="h5" style={{ fontWeight: "600" }}>
                                                            {result.Name}
                                                        </Typography>
                                                        <Typography variant="p" color="textPrimary">
                                                            ...{beginString}<mark>{boldString}</mark>{endString}...
                                                        </Typography>
                                                    </div>
                                                }
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {clearButton}
                        </div>
                        :
                        noSearchResult && searchQuery.length > 0 ?
                        <div>
                            No Search Results.
                            {clearButton}
                        </div>
                        :
                        children
                    }
                    </div>
                </Box>
            </Box>
        </>
    )
}

export {
    DocsLayout,
}