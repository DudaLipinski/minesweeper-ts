import { GameLayout } from 'src/components/Game/GameLayout'
import { Top } from 'src/components/Top/Top'
import { GameWithReactRedux } from 'src/modules/GameWithRedux/GameWithReactRedux/GameWithReactRedux'

export const MinesweeperWithReactRedux = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click" secondAction={''}>
          Minesweeper with Redux
        </Top>
      }
    >
      <GameWithReactRedux />
    </GameLayout>
  )
}
