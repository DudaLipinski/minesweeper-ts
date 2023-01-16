import { Top } from 'src/components/Top/Top'
import { GameLayout } from 'src/components/Game/GameLayout'
import { GameWithUseReducer } from 'src/modules/GameWithUseReducer/GameWithUseReducer'

export const MinesweeperWithUseReducer = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click" secondAction={''}>
          Minesweeper with useReducer
        </Top>
      }
    >
      <GameWithUseReducer />
    </GameLayout>
  )
}
