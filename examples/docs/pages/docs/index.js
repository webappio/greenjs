import { CONTENT as INTRO_CONTENT, MAIN as INTRO_MAIN } from "./introduction/index";
import { CONTENT as RESOURCE_CONTENT, MAIN as RESOURCE_MAIN } from "./resources/index";

const NAV_LINKS = [
    [INTRO_MAIN, INTRO_CONTENT],
    [RESOURCE_MAIN, RESOURCE_CONTENT],
];

const ALL_CONTENT = NAV_LINKS.reduce((arr, content) => {
    return [
        ...arr,
        {
            MAIN: content[0],
            CONTENT: content[1],
        }
    ];
}, []);

export {
    ALL_CONTENT,
}