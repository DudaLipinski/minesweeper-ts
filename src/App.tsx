import { Provider } from 'react-redux'
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useSearchParams,
} from 'react-router-dom'
import { MinesweeperWithHooks } from './pages/MinesweeperWithHooks/MinesweeperWithHooks'
import { MinesweeperWithReactRedux } from './pages/MinesweeperWithRedux/MinesweeperWithReactRedux'
import { MinesweeperWithUseReducer } from './pages/MinesweeperWithUseReducer/MinesweeperWithReactRedux'
import { store } from './store'

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
          <Link to={getLocationObjWithSearchParams('/minesweeper/redux')}>
            Game With Redux
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/usereducer')}>
            Game With useReducer
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const App = () => (
  <Provider store={store}>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/minesweeper">
          <Route path="hooks" element={<MinesweeperWithHooks />}></Route>
          <Route
            path="usereducer"
            element={<MinesweeperWithUseReducer />}
          ></Route>
          <Route path="redux" element={<MinesweeperWithReactRedux />}></Route>
        </Route>
      </Routes>
    </Router>
  </Provider>
)

const Home = () => <h1>Home</h1>

export default App
