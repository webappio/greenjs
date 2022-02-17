import {Head} from "@greenio/head"
import {Route, Link, Router} from "@greenio/router"

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

      <Router>
        <Route path="/" asyncPage={() => import("./pages/Home")} />
        <Route path="/env" asyncPage={() => import("./pages/Env")} />
        <Route path="/about" asyncPage={() => import("./pages/About")} />
      </Router>
    </>
  )
}
