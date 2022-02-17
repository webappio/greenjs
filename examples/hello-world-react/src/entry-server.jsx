import ReactDOMServer from 'react-dom/server'
import { App } from './App'
import {Router} from "@greenio/router";

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <Router location={url} context={context}>
      <App />
    </Router>
  )
}
