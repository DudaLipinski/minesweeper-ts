/* eslint-disable react-hooks/exhaustive-deps */
import { Wrapper } from '../../components/Game/Wrapper'
import { GameArea } from '../../components/Game/GameArea'
import { Scoreboard } from '../../components/Scoreboard/Scoreboard'
import { Grid } from '../../components/Grid/Grid'
import { GameOver } from '../../components/Game/GameOver'
import { GameLevels, LevelNames } from '../GameSettings'
import { useCallback, useReducer } from 'react'

import { reducer, actions, getInitialState } from '../GameWithRedux/game'
import { Coords } from 'src/core/Field'

export const GameWithUseReducer = () => {
  const [
    { level, isGameOver, isWin, settings, playerField, time, flagCounter },
    dispatch,
  ] = useReducer(reducer, getInitialState())

  const [, bombs] = settings

  const onClick = useCallback(
    (coords: Coords) => dispatch(actions.openCell(coords)),
    []
  )

  const onReset = useCallback(() => dispatch(actions.reset()), [])

  const onContextMenu = useCallback(
    (coords: Coords) => dispatch(actions.setFlag(coords)),
    []
  )

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(actions.changeLevel(level as LevelNames))
    },
    []
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
          onChangeLevel={onChangeLevel}
        ></Scoreboard>
        {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  )
}
