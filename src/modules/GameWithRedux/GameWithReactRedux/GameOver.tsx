/* eslint-disable react-hooks/exhaustive-deps */
import { GameOver as GameOverComponent } from 'src/components/Game/GameOver'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './../../../store'
import { useCallback } from 'react'
import { actions } from '../game'

export const GameOver = () => {
  const { isGameOver, isWin } = useSelector(
    ({ game: { isGameOver, isWin } }: RootState) => ({ isGameOver, isWin })
  )

  const dispatch = useDispatch()
  const onReset = useCallback(() => dispatch(actions.reset()), [])

  return (
    <>{isGameOver && <GameOverComponent onClick={onReset} isWin={isWin} />}</>
  )
}
