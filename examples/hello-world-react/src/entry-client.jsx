import ReactDOM from 'react-dom'
import { App } from '../App'
import {Router} from "@greenio/router"

ReactDOM.hydrate(<Router><App /></Router>, document.getElementById('app'));
