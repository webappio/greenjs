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

    regenerateHead() {
        let baseElement = null;
        let titleElement = null;
        let namedMetaElements = {}; //keyed by <meta name=...>
        let otherElements = []; //usually <meta charset=...>

        for(let headElement of document.head.children) {
            if(headElement.hasAttribute("gjs")) {
                document.head.removeChild(headElement);
            }
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
        elements.concat(Object.values(namedMetaElements));
        elements.concat(otherElements);
        for(let {type, attrs, innerText} of elements) {
            const domElement = document.createElement(type);
            if(innerText) {
                domElement.innerText = innerText;
            }
            for(let attr of Object.keys(attrs ?? {})) {
                domElement.setAttribute(attr, attrs[attr]);
            }
            domElement.setAttribute("gjs", '');
            document.head.appendChild(domElement);
        }
    }
}

const Head = ({children}) => {
    window._gjsHeadState ??= new headState();

    const [tag, setTag] = React.useState("");
    React.useEffect(() => {
        const innerTag = window._gjsHeadState.getNewTagId();
        setTag(innerTag);
        return () => {
            delete window._gjsHeadState.tags[innerTag];
            window._gjsHeadState.regenerateHead();
        }
    }, [])

    React.useEffect(() => {
        if(!children || !tag) {
            return;
        }

        if(typeof children.length !== "number") {
            throw new Error("Invalid contents for Head tag, expected list of elements")
        }

        window._gjsHeadState.tags[tag] = [...children].map(({type, props: {children, ...attrs}}) => {
            if(typeof type !== "string") {
                throw new Error("Invalid contents for Head tag, all components must be simple html")
            }
            let element = {type};
            if(children) {
                if(typeof children !== "string") {
                    throw new Error("Invalid contents for Head tag element: "+children);
                }
                element.innerText = children;
            }
            Object.values(attrs).forEach(attrVal => {
                if(typeof attrVal !== "string") {
                    throw new Error("Invalid contents for Head tag element attribute: "+attrVal);
                }
            })
            element.attrs = {...attrs};
            return element;
        });
        window._gjsHeadState.regenerateHead();

    }, [children, tag]);
    return null;
}

export {Head}