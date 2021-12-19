import React, {useEffect} from "react";

const getPathResult = (path, routePath) => {
    if(path.charAt(0) !== "/") {
        path = "/" + path;
    }

    const pathSplit = path.split("/");
    const routeSplit = routePath.split("/");

    const result = {success: false, params: {}, routePath: routePath};
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
    routePath: "",
});

const Router = ({children}) => {
    if (typeof children === "object" && children?.props?.path) {
        children = [children];
    }
    if (typeof children !== "object" || !children.length) {
        throw new Error("Invalid Router children, expected a list of Route")
    }

    const [currRoute, setCurrRoute] = React.useState(null);

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
    return <RouteContext.Provider value={{params: bestMatchResult.params, routePath: bestMatchResult.routePath}}>
        <React.Suspense fallback={<>{currRoute}</>}>
            {React.cloneElement(bestMatchResult.route, {inRouter: true})}
        </React.Suspense>
    </RouteContext.Provider>;
}

const Route = ({path, asyncPage, children, inRouter}) => {
    if (asyncPage) {
        const E = React.lazy(asyncPage);
        if(inRouter) {
            return <E />
        }
        return <React.Suspense fallback={<></>}>
            <E/>
        </React.Suspense>
    }
    return <>{children}</>
}

const Link = React.forwardRef(({href, to, children, activeClassName, className, ...props}, ref) => {
    if (!href && to) {
        href = to;
    }
    let currRoute = useRoute();
    if(activeClassName && currRoute?.routePath) {
        let result = getPathResult(href, currRoute?.routePath)
        if(result.success) {
            if(!className) {
                className = "";
            }
            className = (className + " " + activeClassName).trim();
        }

    }

    return <a href={href} {...props} className={className} onClick={e => {
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