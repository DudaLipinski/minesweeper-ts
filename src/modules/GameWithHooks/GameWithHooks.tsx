import { Wrapper } from '../../components/Game/Wrapper'
import { Top } from '../../components/Top/Top'
import { GameArea } from '../../components/Game/GameArea'
import { Scoreboard } from '../../components/Scoreboard/Scoreboard'
import { Grid } from '../../components/Grid/Grid'
import { GameOver } from '../../components/Game/GameOver'
import { GameLevels, LevelNames } from '../GameSettings'
import { useGame } from 'src/hooks/useGame'

export const GameWithHooks = () => {
  const {
    level,
    isGameOver,
    isWin,
    settings,
    playerField,
    onClick,
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
          time="0"
          bombs={String(bombs)}
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
        <Grid onClick={onClick} onContextMenu={() => null}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  )
}
