import React from 'react'
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useSearchParams,
} from 'react-router-dom'
import { GameWithHooks } from './modules/GameWithHooks/GameWithHooks'
import { MinesweeperWithHooks } from './pages/MinesweeperWithHooks/MinesweeperWithHooks'

const Navigation = () => {
  const [searchParams] = useSearchParams()
  const level = searchParams.get('level') || ''

  const getLocationObjWithSearchParams = (
    pathname: string
  ): Partial<Location> => ({
    pathname,
    search: `${
      level &&
      `?${new URLSearchParams({
        level,
      }).toString()}`
    }`,
  })

  return (
    <nav>
      <ul>
        <li>
          <Link to={getLocationObjWithSearchParams('/')}>Home</Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/hooks')}>
            Game With Hooks
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/usereducer')}>
            Game With useReducer
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/reactredux')}>
            Game With ReactRedux
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const App = () => (
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/minesweeper">
        <Route path="hooks" element={<MinesweeperWithHooks />}></Route>
        <Route path="usereducer" element={<GameWithHooks />}></Route>
        <Route path="reactredux" element={<GameWithHooks />}></Route>
      </Route>
    </Routes>
  </Router>
)

const Home = () => <h1>Home</h1>

export default App
