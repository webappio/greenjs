"use strict";
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var ReactDOMServer = require("react-dom/server");
var React = require("react");
var jsxRuntime = require("react/jsx-runtime");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var ReactDOMServer__default = /* @__PURE__ */ _interopDefaultLegacy(ReactDOMServer);
var React__default = /* @__PURE__ */ _interopDefaultLegacy(React);
const SSRContext = React__default["default"].createContext({
  context: {
    headTags: [],
    headPromise: null
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const routerContext = React__default["default"].createContext({
  staticURL: null,
  currRoute: null,
  context: {},
  setCurrRoute: (route) => null
});
const Router = ({
  staticURL,
  context,
  children
}) => {
  const [route, setCurrRoute] = React.useState(null);
  const currRouter = React.useContext(routerContext) || {};
  return /* @__PURE__ */ React__default["default"].createElement(routerContext.Provider, {
    value: {
      staticURL: staticURL || currRouter.staticURL,
      currRoute: route,
      setCurrRoute,
      context: context || {}
    }
  }, children);
};
const getPathResult = (path, routePath) => {
  if (path.charAt(0) !== "/") {
    path = "/" + path;
  }
  const pathSplit = path.split("/");
  const routeSplit = routePath.split("/");
  const result = {
    success: false,
    params: {},
    routePath
  };
  for (let i = 0; i < routeSplit.length; i += 1) {
    if (routeSplit[i].charAt(0) === ":") {
      result.params = __spreadProps(__spreadValues({}, result.params), {
        [routeSplit[i].substring(1)]: pathSplit[i]
      });
    } else if (routeSplit[i].charAt(0) === "*") {
      result.success = true;
      return result;
    } else if (i >= pathSplit.length || pathSplit[i] !== routeSplit[i]) {
      result.success = false;
      return result;
    }
  }
  result.success = routeSplit.length === pathSplit.length;
  return result;
};
const ensureHistoryPatched = () => {
  if (typeof window === "undefined") {
    return;
  }
  const {
    context
  } = React.useContext(routerContext);
  context.pushStateListeners || (context.pushStateListeners = []);
  if (!window._GreenJsHistoryPatched) {
    window._GreenJsHistoryPatched = true;
    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        const res = target.apply(thisArg, argArray);
        for (let listener of context.pushStateListeners || []) {
          listener(window.location.pathname);
        }
        return res;
      }
    });
    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply: (target, thisArg, argArray) => {
        const res = target.apply(thisArg, argArray);
        for (let listener of context.pushStateListeners || []) {
          listener(window.location.pathname);
        }
        return res;
      }
    });
  }
};
React__default["default"].forwardRef((_a, ref) => {
  var _b = _a, {
    href,
    to,
    children,
    activeClassName,
    className
  } = _b, props = __objRest(_b, ["href", "to", "children", "activeClassName", "className"]);
  ensureHistoryPatched();
  const loc = useLocation();
  if (!href && to) {
    href = to;
  }
  const url = new URL(href, loc.href);
  let {
    context,
    currRoute
  } = React.useContext(routerContext) || {};
  if (activeClassName && (currRoute == null ? void 0 : currRoute.routePath)) {
    let result = getPathResult(url.pathname, currRoute == null ? void 0 : currRoute.routePath);
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
  }
  const tryPreloadImports = () => {
    var _a2, _b2;
    if (externalHost) {
      return;
    }
    if (!currRoute) {
      return;
    }
    if (!context) {
      return;
    }
    let match = currRoute.getMatchingRoute(url.pathname);
    let asyncPage = (_b2 = (_a2 = match == null ? void 0 : match.reactEl) == null ? void 0 : _a2.props) == null ? void 0 : _b2.asyncPage;
    if (!asyncPage) {
      return;
    }
    asyncPage().then((page) => {
      context.asyncPages = __spreadProps(__spreadValues({}, context.asyncPages || {}), {
        [match.matchResult.routePath]: page.default
      });
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx("a", __spreadProps2(__spreadValues2({}, __spreadProps(__spreadValues({
    href
  }, props), {
    className,
    onClick: (e) => {
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
    },
    ref,
    onFocus: tryPreloadImports,
    onMouseEnter: tryPreloadImports
  })), {
    children
  }));
});
const useLocation = () => {
  const routerCtx = React__default["default"].useContext(routerContext);
  if (typeof document !== "undefined") {
    return document.location;
  }
  return new URL(routerCtx.staticURL || "");
};
function Site() {
  throw new Error("sad");
}
(function dedupeRequire(dedupe) {
  const Module = require("module");
  const resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request[0] !== "." && request[0] !== "/") {
      const parts = request.split("/");
      const pkgName = parts[0][0] === "@" ? parts[0] + "/" + parts[1] : parts[0];
      if (dedupe.includes(pkgName)) {
        parent = module;
      }
    }
    return resolveFilename(request, parent, isMain, options);
  };
})(["react", "react-dom"]);
async function render(url, context) {
  const element = /* @__PURE__ */ jsxRuntime.jsx(Router, {
    staticURL: url,
    context,
    children: /* @__PURE__ */ jsxRuntime.jsx(SSRContext.Provider, {
      value: {
        context
      },
      children: /* @__PURE__ */ jsxRuntime.jsx(Site, {})
    })
  });
  ReactDOMServer__default["default"].renderToStaticMarkup(element);
  await Promise.all([...Object.values(context.routePromises || {}), context.headPromise].filter((x) => !!x));
  return ReactDOMServer__default["default"].renderToString(element);
}
exports.render = render;
