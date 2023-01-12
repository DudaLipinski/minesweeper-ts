/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '../../components/Game/Wrapper'
import { GameArea } from '../../components/Game/GameArea'
import { Scoreboard } from '../../components/Scoreboard/Scoreboard'
import { Grid } from '../../components/Grid/Grid'
import { GameOver } from '../../components/Game/GameOver'
import { GameLevels, LevelNames } from '../GameSettings'
import { useGame } from 'src/modules/GameWithHooks/useGame'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const GameWithHooks = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlLevelParam = (searchParams.get('level') || undefined) as LevelNames

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
  } = useGame(urlLevelParam)

  const [, bombs] = settings

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level })
      onChangeLevel(level as LevelNames)
    },
    [onChangeLevel]
  )

  return (
    <Wrapper>
      <GameArea>
        <Scoreboard
          time={String(time)}
          bombs={String(bombs - flagCounter)}
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          onReset={onReset}
          onChangeLevel={onChangeLevelHandler}
        ></Scoreboard>
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  )
}
