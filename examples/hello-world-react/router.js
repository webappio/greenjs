import React from "react";

const RouterContext = React.createContext({
    routeTree: null,
});

const Router = ({children}) => {
    if (typeof children !== "object" || !children.length) {
        throw new Error("Invalid Router children, expected a list of Route")
    }

    let routerExists = false;
    try {
        routerExists = React.useContext(RouterContext).routeTree;
    } catch (e){}
    if(routerExists) {
        throw new Error("cannot have nested Routers in greenjs");
    }

    const [pathname, setPathname] = React.useState(window.location.pathname);
    window.history.pushState = new Proxy(window.history.pushState, {
        apply: (target, thisArg, argArray) => {
            const res = target.apply(thisArg, argArray);
            setPathname(window.location.pathname);
            return res;
        },
    });
    window.addEventListener("popstate", e => {
        setPathname(window.location.pathname);
    })

    let bestMatch = null;
    for (let route of children) {
        if (!route?.props?.path) {
            throw new Error("Invalid Router child, all children must be Routes with a path")
        }
        if (pathname.startsWith(route.props.path)) {
            if (bestMatch === null) {
                bestMatch = route;
            } else if (route.props.path.length > bestMatch.props.path.length) {
                bestMatch = route;
            }
        }
        window._GreenJSRoutes = {...(window._GreenJSRoutes ?? {}), [route.props.path]: true}

    }
    return <RouterContext.Provider value={{routeTree: {"hello": "world"}}}>
        {bestMatch}
    </RouterContext.Provider>
}

const Route = ({path, exact, asyncPage, children}) => {
    if (asyncPage) {
        const E = React.lazy(asyncPage);
        return <React.Suspense fallback={<>...</>}>
            <E/>
        </React.Suspense>
    }
    return <>{children}</>
}

const Link = ({href, to, children}) => {
    if (!href && to) {
        href = to;
    }
    return <a href={href} onClick={e => {
        if (!e.ctrlKey) {
            e.preventDefault();
            history.pushState(null, "", href);
        }
    }}>{children}</a>
}

export {Router, Route, Link}