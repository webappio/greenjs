import React from "react";
import ReactDOM from "react-dom";

const Render = (element, callback) => {
    const newRoot = document.createElement("div");
    (GreenJsHydrating ? ReactDOM.hydrate : ReactDOM.render) (
        element,
        newRoot,
        () => Promise.all(Object.values(window._GreenJSPromises || {})).then(() => {
            document.body.removeChild(document.getElementById("react-root"));
            document.body.appendChild(newRoot);
            newRoot.id = "react-root";
            if(callback) {
                callback();
            }
        })
    );
}


export {Render}