import { Wrapper } from '../../components/Game/Wrapper'
import { Top } from '../../components/Top/Top'
import { GameArea } from '../../components/Game/GameArea'
import { Scoreboard } from '../../components/Scoreboard/Scoreboard'
import { Grid } from '../../components/Grid/Grid'
import { GameOver } from '../../components/Game/GameOver'
import { GameLevels, LevelNames } from '../GameSettings'
import { useGame } from 'src/modules/GameWithHooks/useGame'

export const GameWithHooks = () => {
  const {
    level,
    isGameOver,
    isWin,
    settings,
    playerField,
    time,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset,
  } = useGame()

  const [, bombs] = settings

  return (
    <Wrapper>
      <Top feature="Flag" firstAction="right click" secondAction="">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time={String(time)}
          bombs={String(bombs - flagCounter)}
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onReset={onReset}
          onChangeLevel={({
            target: { value: level },
          }: React.ChangeEvent<HTMLSelectElement>) =>
            onChangeLevel(level as LevelNames)
          }
        ></Scoreboard>
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  )
}
