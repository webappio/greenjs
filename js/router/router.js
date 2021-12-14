import React from "react";

const getPathResult = (path, routeDef) => {
    if(path.charAt(0) !== "/") {
        path = "/" + path;
    }

    const pathSplit = path.split("/");
    const routeSplit = routeDef.split("/");

    const result = {success: false, params: {}};
    for(let i = 0; i < routeSplit.length; i += 1) {
        if(routeSplit[i].charAt(0) === ":") {
            result.params = {...result.params, [routeSplit[i].substring(1)]: pathSplit[i]};
            //route is of the form /hello/:param/something
        } else if (routeSplit[i].charAt(0) === "*") {
            //route is of the form /hello/*param
            result.success = true;
            return result;
        } else if(i >= pathSplit.length || pathSplit[i] !== routeSplit[i]) {
            result.success = false;
            return result;
        }
    }
    result.success = routeSplit.length === pathSplit.length;
    return result;
}

const RouteContext = React.createContext({
    params: {},
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

    let bestMatchResult = null;
    for (let route of children) {
        if (!route?.props?.path) {
            throw new Error("Invalid Router child, all children must be Routes with a path")
        }
        let matchResult = getPathResult(pathname, route.props.path);
        if (matchResult.success) {
            if (bestMatchResult === null) {
                bestMatchResult = {...matchResult, route: route};
            }
        }
        window._GreenJSRoutes = {...(window._GreenJSRoutes ?? {}), [route.props.path]: true}
    }
    if(!bestMatchResult) {
        return null;
    }
    return <RouteContext.Provider value={{params: bestMatchResult.params}}>
        {bestMatchResult.route}
    </RouteContext.Provider>;
}

const Route = ({path, asyncPage, children}) => {
    if (asyncPage) {
        const E = React.lazy(asyncPage);
        return <React.Suspense fallback={<></>}>
            <E/>
        </React.Suspense>
    }
    return <>{children}</>
}

const Link = React.forwardRef(({href, to, children, ...props}, ref) => {
    if (!href && to) {
        href = to;
    }
    return <a href={href} {...props} onClick={e => {
        let modKeyDown = false;
        if(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
            modKeyDown = e.metaKey;
        } else {
            modKeyDown = e.ctrlKey;
        }
        if (!modKeyDown) {
            e.preventDefault();
            history.pushState(null, "", href);
        }
    }} ref={ref}>{children}</a>
});

const useRoute = () => {
    return React.useContext(RouteContext);
}

export {Router, Route, Link, useRoute}