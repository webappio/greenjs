import ReactDOM from 'react-dom'
import {Router} from "@greenio/router"
import { App } from './App'

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)
