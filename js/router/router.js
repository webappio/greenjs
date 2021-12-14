import React from "react";

const pathMatches = (path, routeDef) => {
    if(path.charAt(0) !== "/") {
        path = "/" + path;
    }
    if(path === routeDef) {
        return true
    }

    const pathSplit = path.split("/");
    const routeSplit = routeDef.split("/");

    for(let i = 0; i < routeSplit.length; i += 1) {
        if(routeSplit[i].charAt(0) === ":") {
            //route is of the form /hello/:param/something
        } else if (routeSplit[i].charAt(0) === "*") {
            //route is of the form /hello/*param
            return true;
        } else if(i >= pathSplit.length || pathSplit[i] !== routeSplit[i]) {
            return false;
        }
    }
    return routeSplit.length === pathSplit.length;
}

const RouteContext = React.createContext({
    routeTree: null,
});

const Router = ({children}) => {
    if (typeof children === "object" && children?.props?.path) {
        children = [children];
    }
    if (typeof children !== "object" || !children.length) {
        throw new Error("Invalid Router children, expected a list of Route")
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
        if (pathMatches(pathname, route.props.path)) {
            if (bestMatch === null) {
                bestMatch = route;
            }
        }
        window._GreenJSRoutes = {...(window._GreenJSRoutes ?? {}), [route.props.path]: true}
    }
    return bestMatch;
}

const Route = ({path, exact, asyncPage, children}) => {
    if (asyncPage) {
        const E = React.lazy(asyncPage);
        return <React.Suspense fallback={<></>}>
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