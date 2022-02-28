'use strict';

import React from "react";

class headState {
    constructor() {
        this.currTagId = 1;
        this.tags = {}; //map of tag ID to {attr: ..., children: ...}
    }

    getNewTagId() {
        return this.currTagId++;
    }

    regenerateHead(ssrContext) {
        let baseElement = null;
        let titleElement = null;
        let namedMetaElements = {}; //keyed by <meta name=...>
        let otherElements = []; //usually <meta charset=...>

        //we are on the browser
        if(!ssrContext) {
            [...document.head.children]
                .filter(x => x.hasAttribute("gjs"))
                .forEach(x => document.head.removeChild(x));
        }

        let keys = Object.keys(this.tags);
        keys.sort((a, b) => +a - +b);
        for(let key of keys) {
            for(let element of this.tags[key]) {
                let {type, attrs} = element;
                switch (type) {
                    case "base":
                        baseElement = element;
                        break;
                    case "title":
                        titleElement = element;
                        break;
                    case "meta":
                        if (attrs["name"]) {
                            namedMetaElements[attrs["name"]] = element;
                        } else {
                            otherElements.push(element);
                        }
                        break;
                    default:
                        otherElements.push(element);
                        break;
                }
            }
        }

        let elements = [];
        if(baseElement) {
            elements.push(baseElement);
        }
        if(titleElement) {
            elements.push(titleElement);
        }
        elements.push(...Object.values(namedMetaElements));
        elements.push(...otherElements);
        if(ssrContext) {
            ssrContext.context.headTags = elements;
        } else {
            for (let {type, attrs, innerText} of elements) {
                const domElement = document.createElement(type);
                if (innerText) {
                    if (type === "script") {
                        domElement.innerHTML = innerText;
                        if (!attrs.type) {
                            attrs.type = "text/javascript";
                        }
                    } else {
                        domElement.innerText = innerText;
                    }
                }
                for (let attr of Object.keys(attrs ?? {})) {
                    if (typeof attr === "boolean") {
                        if (attr) {
                            domElement.setAttribute(attr, "");
                        }
                    } else if (typeof attr === "string") {
                        domElement.setAttribute(attr, attrs[attr]);
                    } else {
                        throw new Error("Invalid contents for Head tag element attribute: " + key + "=" + attrs[key]);
                    }
                }
                domElement.setAttribute("gjs", '');
                document.head.appendChild(domElement);
            }
        }
    }
}

const Head = ({children}) => {
    const ssrContext = React.useContext(SSRContext);
    let gjsHeadState;
    if(ssrContext) {
        if(!ssrContext._gjsHeadState) {
            ssrContext._gjsHeadState = new headState();
        }
        gjsHeadState = ssrContext._gjsHeadState;
    } else {
        if(!window._gjsHeadState) {
            window._gjsHeadState = new headState();
        }
        gjsHeadState = window._gjsHeadState;
    }
    const [tag, setTag] = React.useState(gjsHeadState.getNewTagId());
    React.useEffect(() => {
        return () => {
            delete gjsHeadState.tags[tag];
            gjsHeadState.regenerateHead(ssrContext);
        }
    }, []);

    let childrenList = [];
    if(!children) {
        childrenList = [];
    } if(typeof children.length === "number") {
        childrenList = [...children];
    } else if(typeof children.props !== "undefined") {
        childrenList = [children];
    } else {
        throw new Error("Invalid contents for Head tag, expected list of elements, got "+children);
    }
    const elements = childrenList.map(({type, props: {children, ...attrs}}) => {
        if(typeof type !== "string") {
            throw new Error("Invalid contents for Head tag, all components must be simple html")
        }
        let element = {type};
        if(children) {
            if(typeof children.length === "number") {
                element.innerText = [...children].map(x => String(x)).join("");
            } else if(typeof children !== "string") {
                element.innerText = children;
            } else {
            throw new Error("Invalid contents for Head tag element: " + children);
            }
        }
        element.attrs = {...attrs};
        return element;
    });

    React.useEffect(() => {
        if(elements.length === 0 || !tag) {
            return;
        }

        gjsHeadState.tags[tag] = elements;
        gjsHeadState.regenerateHead();
    }, [JSON.stringify(elements), tag]);

    if(ssrContext?.context && !ssrContext?.context?.headPromise) {
        ssrContext.context.headPromise = (async () => {
            gjsHeadState.tags[tag] = elements;
            gjsHeadState.regenerateHead(ssrContext);
        })();
    }

    return null;
}

const SSRContext = React.createContext({
    context: {
        headTags: [],
        headPromise: null,
    }
})

export {Head, SSRContext}