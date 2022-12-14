import { Scoreboard } from './components/Scoreboard/Scoreboard'

function App() {
  return (
    <div className="App">
      <Scoreboard
        time="000"
        levels={['beginner', 'intermediate', 'expert']}
        onReset={() => null}
        mines="010"
      />
    </div>
  )
}

export default App
