import { ChangeEvent } from 'react'
import { Scoreboard } from './components/Scoreboard/Scoreboard'
import { Top } from './components/Top/Top'
import { Cell } from './components/Grid/Cell/Cell'
import { Coords } from '@helpers/Field'

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
      <Cell
        children={0}
        coords={[1, 1]}
        onClick={() => null}
        onContextMenu={() => null}
      ></Cell>
    </div>
  )
}

export default App
