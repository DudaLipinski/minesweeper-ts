/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { GameLevels, LevelNames } from 'src/modules/GameSettings'
import { RootState } from './../../../store'
import { Scoreboard as ScoreboardComponent } from 'src/components/Scoreboard/Scoreboard'
import React, { useCallback } from 'react'
import { actions } from '../game'

export const Scoreboard = () => {
  const { level, time, bombs, flagCounter } = useSelector(
    ({ game: { level, time, bombs, flagCounter } }: RootState) => ({
      level,
      time,
      bombs,
      flagCounter,
    })
  )
  const dispatch = useDispatch()

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(actions.changeLevel(level as LevelNames)),
    []
  )

  const onReset = useCallback(() => dispatch(actions.reset()), [])

  return (
    <ScoreboardComponent
      time={String(time)}
      bombs={String(bombs - flagCounter)}
      levels={GameLevels as unknown as string[]}
      defaultLevel={level}
      onReset={onReset}
      onChangeLevel={onChangeLevel}
    ></ScoreboardComponent>
  )
}
