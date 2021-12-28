import React, {useEffect} from "react";

const getPathResult = (path, routePath) => {
    if (path.charAt(0) !== "/") {
        path = "/" + path;
    }

    const pathSplit = path.split("/");
    const routeSplit = routePath.split("/");

    const result = {success: false, params: {}, routePath: routePath};
    for (let i = 0; i < routeSplit.length; i += 1) {
        if (routeSplit[i].charAt(0) === ":") {
            result.params = {...result.params, [routeSplit[i].substring(1)]: pathSplit[i]};
            //route is of the form /hello/:param/something
        } else if (routeSplit[i].charAt(0) === "*") {
            //route is of the form /hello/*param
            result.success = true;
            return result;
        } else if (i >= pathSplit.length || pathSplit[i] !== routeSplit[i]) {
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
    getMatchingRoute: route => null,
});

const RouteView = ({route, routePath}) => {
    const [currContents, setCurrContents] = React.useState(null);
    const [currRoutePath, setCurrRoutePath] = React.useState(null);

    if(route?.props?.asyncPage) {
        if(window._GreenJSAsyncPages && window._GreenJSAsyncPages[routePath]) {
            let Page = window._GreenJSAsyncPages[routePath];
            if(currRoutePath !== routePath) {
                setCurrContents(<Page />);
                setCurrRoutePath(routePath);
            }
            return <Page />;
        }
        let importPromise = new Promise(resolve => {
            route?.props?.asyncPage().then(page => {
                window._GreenJSAsyncPages = {...(window._GreenJSAsyncPages || {}), [routePath]: page.default}
                let Page = page.default;
                setCurrContents(<Page />);
                setCurrRoutePath(routePath);
                resolve(true);
            })
        });
        window._GreenJSPromises = {...(window._GreenJSPromises || {}), [routePath]: importPromise};
    } else {
        if(currRoutePath !== routePath) {
            setCurrContents(route);
            setCurrRoutePath(routePath);
        }
        return route;
    }

    return currContents;
}

const Router = ({children}) => {
    if (typeof children === "object" && children?.props?.path) {
        children = [children];
    }
    if (typeof children !== "object" || !children.length) {
        throw new Error("Invalid Router children, expected a list of Route")
    }

    const [pathname, setPathname] = React.useState(window.location.pathname);
    if(!window._GreenJsPushStatePatched) {
        window._GreenJsPushStatePatched = true;
        window.history.pushState = new Proxy(window.history.pushState, {
            apply: (target, thisArg, argArray) => {
                const res = target.apply(thisArg, argArray);
                for(let listener of (window._GreenJsPushStateListeners || [])) {
                    listener(window.location.pathname);
                }
                return res;
            },
        });
    }
    window.addEventListener("popstate", e => {
        setPathname(window.location.pathname);
    })

    useEffect(() => {
        const listener = (x) => setPathname(x);
        window._GreenJsPushStateListeners = [...(window._GreenJsPushStateListeners || []), listener];
        return () => {
            window._GreenJsPushStateListeners = window._GreenJsPushStateListeners.filter(x => x !== listener);
        }
    }, [])

    const getBestRoute = path => {
        let bestMatchResult = null;
        for (let route of children) {
            if (!route?.props?.path) {
                throw new Error("Invalid Router child, all children must be Routes with a path")
            }
            let matchResult = getPathResult(path, route.props.path);
            if (matchResult.success) {
                if (bestMatchResult === null) {
                    bestMatchResult = {matchResult, reactEl: route};
                }
            }
            window._GreenJSRoutes = {...(window._GreenJSRoutes ?? {}), [route.props.path]: true}
        }
        return bestMatchResult;
    }
    let result = getBestRoute(pathname);

    if (!result) {
        return null;
    }

    return <RouteContext.Provider value={{
        params: result.matchResult.params,
        routePath: result.matchResult.routePath,
        getMatchingRoute: path => getBestRoute(path),
    }}>
        <RouteView route={result?.reactEl} routePath={result?.matchResult.routePath} />
    </RouteContext.Provider>;
}

const Route = ({path, asyncPage, children}) => {
    if (asyncPage) {
        const Loaded = (window._GreenJSAsyncPages || {})[path];
        if(Loaded) {
            return <Loaded />
        }
        const E = React.lazy(async () => {
            let importResult = await asyncPage();
            window._GreenJSAsyncPages = {...(window._GreenJSAsyncPages || {}), [path]: importResult.default}
            return importResult;
        });
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
    const url = new URL(href, document.location.href);
    let currRoute = useRoute();
    if (activeClassName && currRoute?.routePath) {
        let result = getPathResult(url.pathname, currRoute?.routePath)
        if (result.success) {
            if (!className) {
                className = "";
            }
            className = (className + " " + activeClassName).trim();
        }
    }
    let externalHost = false;
    try {
        if (url.host !== document.location.host) {
            externalHost = true;
        }
    } catch (e) {
    } //invalid hostname of some sort

    const tryPreloadImports = () => {
        if(externalHost) {
            return;
        }
        if(!currRoute) {
            return;
        }
        let match = currRoute.getMatchingRoute(url.pathname);
        let asyncPage = match?.reactEl?.props?.asyncPage;
        if(!asyncPage) {
            return;
        }
        asyncPage().then(page => {
            window._GreenJSAsyncPages = {...(window._GreenJSAsyncPages || {}), [match.matchResult.routePath]: page.default}
        })
    }

    return <a
        href={href}
        {...props}
        className={className}
        onClick={e => {
            if (externalHost) {
                return;
            }
            let modKeyDown = false;
            if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
                modKeyDown = e.metaKey;
            } else {
                modKeyDown = e.ctrlKey;
            }
            if (!modKeyDown) {
                e.preventDefault();
                history.pushState(null, "", href);
            }
        }}
        ref={ref}
        onFocus={tryPreloadImports}
        onMouseEnter={tryPreloadImports}
    >{children}</a>
});

const useRoute = () => {
    return React.useContext(RouteContext);
}

export {Router, Route, Link, useRoute}