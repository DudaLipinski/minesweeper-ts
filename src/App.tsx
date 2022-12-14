import { ChangeEvent } from 'react'
import { Scoreboard } from './components/Scoreboard/Scoreboard'
import { Top } from './components/Top/Top'

function App() {
  return (
    <div className="App">
      <Top
        feature="Flag"
        firstAction="ctrl"
        secondAction="click"
        children="Minesweeper"
      />
      <Scoreboard
        time="000"
        levels={['beginner', 'intermediate', 'expert']}
        onReset={() => null}
        mines="010"
        onChangeLevel={function (event: ChangeEvent<HTMLSelectElement>): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}

export default App
