import { DocLink } from "../Links";
import Welcome from "./welcome.md";
import UsingThis from "./using-this.md";
import DocsTemplate from "./docs-template.md";
import Linking from "./linking.md";
import Search from "./search.md";
import Confused from "./confused.md";


const CONTENT = [
    new DocLink("Welcome", "/#introduction", Welcome),
    new DocLink("Docs Structure", "/#docs-template-structure", DocsTemplate),
    new DocLink("Linking to a Section", "/#linking-to-a-section", Linking),
    new DocLink("Search", "/#docs-search", Search),
    new DocLink("Confused?", "/#confused", Confused),
    new DocLink("End", "/#end-of-docs", UsingThis),
];

const MAIN = new DocLink("Introduction", "/", "");

export {
    CONTENT,
    MAIN,
}