import { Top } from 'src/components/Top/Top'
import { GameLayout } from 'src/components/Game/GameLayout'
import { GameWithHooks } from 'src/modules/GameWithHooks/GameWithHooks'

export const MinesweeperWithReactRedux = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click" secondAction={''}>
          Minesweeper with ReactRedux special for you
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  )
}
