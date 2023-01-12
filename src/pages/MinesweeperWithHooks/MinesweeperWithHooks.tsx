import { GameLayout } from 'src/components/Game/GameLayout'
import { Top } from 'src/components/Top/Top'
import { GameWithHooks } from 'src/modules/GameWithHooks/GameWithHooks'

export const MinesweeperWithHooks = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click" secondAction={''}>
          Minesweeper with hooks
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  )
}
