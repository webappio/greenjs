import {Head} from "@greenio/head"
import {Route, Link, Switch} from "@greenio/router"

export function App() {
  return (
    <>
        <Head>
            <title>app!</title>
        </Head>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/env">Env</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/" asyncPage={() => import("./src/pages/Home")} />
        <Route path="/env" asyncPage={() => import("./src/pages/Env")} />
        <Route path="/about" asyncPage={() => import("./src/pages/About")} />
      </Switch>
    </>
  )
}
