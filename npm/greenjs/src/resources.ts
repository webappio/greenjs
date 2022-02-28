const GenerateIndex = (head: string, appHTML: string, importStatements: string | string[]) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${head}
  </head>
  <body>
    <div id="app">${appHTML}</div>
    ${typeof importStatements !== "string" ? importStatements.join("\n") : importStatements}
  </body>
</html>
`.trim()

const GenerateEntryServer = () => `
import ReactDOMServer from 'react-dom/server'
import App from './App'
import {Router} from "@greenio/router";
import {SSRContext} from "@greenio/head";

export async function render(url, context) {
    const element = <Router staticURL={url} context={context}>
      <SSRContext.Provider value={{context: context}}>
        <App />
      </SSRContext.Provider>
    </Router>;
    ReactDOMServer.renderToStaticMarkup(element);
    await Promise.all([...Object.values(context.routePromises || {}), context.headPromise].filter(x => !!x));
    return ReactDOMServer.renderToString(element);
}
`.trim()


const GenerateEntryClient = () => `
import ReactDOM from 'react-dom'
import App from './App'
import {Router} from "@greenio/router"

ReactDOM.hydrate(<Router><App /></Router>, document.getElementById('app'));
`.trim();

export { GenerateIndex, GenerateEntryClient, GenerateEntryServer }
