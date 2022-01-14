import { DocLink } from "../Links";
import Intro from "./intro.md";
import Another from "./another.md";

const CONTENT = [
    new DocLink("Extra", "/resources#something-else", Intro),
    new DocLink("Extra", "/resources#another", Another),
];

const MAIN = new DocLink("Resources", "/", "");

export {
    CONTENT,
    MAIN,
}