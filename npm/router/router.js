import React, {useEffect, useState, useContext} from "react";

const routerContext = React.createContext({
    staticURL: null,
    currRoute: null,
    context: {},
    setCurrRoute: route => null,
});

const Router = ({staticURL, context, children}) => {
    const [route, setCurrRoute] = useState(null);
    const currRouter = useContext(routerContext) || {};
    return <routerContext.Provider
        value={{
            staticURL: staticURL || currRouter.staticURL,
            currRoute: route,
            setCurrRoute: setCurrRoute,
            context: context || {},
        }}
    >{children}</routerContext.Provider>
}

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

const RouteView = ({route, routePath}) => {
    const [currContents, setCurrContents] = React.useState(null);
    const [currRoutePath, setCurrRoutePath] = React.useState(null);
    const {context} = useContext(routerContext);

    if(route?.props?.asyncPage) {
        if(context.asyncPages && context.asyncPages[routePath]) {
            let Page = context.asyncPages[routePath];
            if(currRoutePath !== routePath) {
                setCurrContents(<Page />);
                setCurrRoutePath(routePath);
            }
            return <Page />;
        }
        let importPromise = new Promise(resolve => {
            route?.props?.asyncPage().then(page => {
                context.asyncPages = {...(context.asyncPages || {}), [routePath]: page.default}
                let Page = page.default;
                setCurrContents(<Page />);
                setCurrRoutePath(routePath);
                resolve(true);
            })
        });
        context.routePromises = {...(context.routePromises || {}), [routePath]: importPromise};
    } else {
        if(currRoutePath !== routePath) {
            setCurrContents(route);
            setCurrRoutePath(routePath);
        }
        return route;
    }

    return currContents;
}

const ensureHistoryPatched = () => {
    if(typeof window === "undefined") {
        return; //SSR
    }
    const {context} = useContext(routerContext);
    context.pushStateListeners ||= [];
    if(!window._GreenJsHistoryPatched) {
        window._GreenJsHistoryPatched = true;
        window.history.pushState = new Proxy(window.history.pushState, {
            apply: (target, thisArg, argArray) => {
                const res = target.apply(thisArg, argArray);
                for(let listener of (context.pushStateListeners || [])) {
                    listener(window.location.pathname);
                }
                return res;
            },
        });
        window.history.replaceState = new Proxy(window.history.replaceState, {
            apply: (target, thisArg, argArray) => {
                const res = target.apply(thisArg, argArray);
                for(let listener of (context.pushStateListeners || [])) {
                    listener(window.location.pathname);
                }
                return res;
            },
        });
    }
}

const Switch = ({children}) => {
    const RouterContext = useContext(routerContext);
    if(!RouterContext) {
        throw new Error("Switch can only be used within a Router")
    }

    const {context, setCurrRoute} = RouterContext;
    const loc = useLocation();
    ensureHistoryPatched();

    const [pathname, setPathname] = React.useState(loc.pathname);
    if (typeof children === "object" && children?.props?.path) {
        children = [children];
    }
    if (typeof children !== "object" || !children.length) {
        throw new Error("Invalid Switch children, expected a list of Route")
    }

    if(typeof window !== "undefined") {
        window.addEventListener("popstate", e => {
            setPathname(window.location.pathname);
        })

        useEffect(() => {
            const listener = (x) => setPathname(x);
            context.pushStateListeners = [...(context.pushStateListeners || []), listener];
            listener(window.location.pathname); //in case someone changed location in a useEffect
            return () => {
                context.pushStateListeners = context.pushStateListeners.filter(x => x !== listener);
            }
        }, [])
    }

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
            context.routes = {...(context.routes ?? {}), [route.props.path]: true}
        }
        return bestMatchResult;
    }
    let result = getBestRoute(pathname);
    useEffect(() => {
        setCurrRoute({
            params: result.matchResult.params,
            routePath: result.matchResult.routePath,
            getMatchingRoute: path => getBestRoute(path),
        });
    }, [pathname]);

    if (!result) {
        return null;
    }

    return <RouteView route={result?.reactEl} routePath={result?.matchResult.routePath} />
}

const Route = ({path, asyncPage, children}) => {
    const RouterContext = useContext(routerContext);
    if(!RouterContext) {
        throw new Error("Switch can only be used within a Router")
    }

    const {context} = RouterContext;
    ensureHistoryPatched();
    if (asyncPage) {
        const Loaded = (context.asyncPages || {})[path];
        if(Loaded) {
            return <Loaded />
        }
        const E = React.lazy(async () => {
            let importResult = await asyncPage();
            context.asyncPages = {...(context.asyncPages || {}), [path]: importResult.default}
            return importResult;
        });
        return <React.Suspense fallback={<></>}>
            <E/>
        </React.Suspense>
    }
    return <>{children}</>
}

const Link = React.forwardRef(({href, to, children, activeClassName, className, ...props}, ref) => {
    ensureHistoryPatched();
    const loc = useLocation();
    if (!href && to) {
        href = to;
    }
    const url = new URL(href, loc.href);

    let {context, currRoute} = useContext(routerContext) || {};
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
        if (url.host !== loc.host) {
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
        if(!context) {
            return;
        }
        let match = currRoute.getMatchingRoute(url.pathname);
        let asyncPage = match?.reactEl?.props?.asyncPage;
        if(!asyncPage) {
            return;
        }
        asyncPage().then(page => {
            context.asyncPages = {...(context.asyncPages || {}), [match.matchResult.routePath]: page.default}
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

const Redirect = ({to, push}) => {
    let {context, currRoute} = useContext(routerContext) || {};
    ensureHistoryPatched();
    let match = currRoute.getMatchingRoute(to);
    if(!match) {
        throw new Error("Invalid redirect target, could not find route: "+to);
    }
    useEffect(() => {
        if(push) {
            history.pushState(null, "", to);
        } else {
            history.replaceState(null, "", to);
        }
    }, [context.pushStateListeners]);
    return null;
}

const useRoute = () => {
    //TODO make this work with SSR
    return React.useContext(routerContext)?.currRoute;
}

const useLocation = () => {
    const routerCtx = React.useContext(routerContext);
    if(typeof document !== "undefined") {
        return document.location;
    }
    return new URL(routerCtx.staticURL || "");
}

export {Router, Switch, Route, Link, Redirect, useRoute, useLocation}