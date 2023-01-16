/* eslint-disable react-hooks/exhaustive-deps */
import { Grid as GridComponent } from 'src/components/Grid/Grid'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from './../../../store'
import { actions, runTimer } from '../game'
import { useCallback } from 'react'
import { Coords } from 'src/core/Field'

export const Grid = () => {
  const { playerField } = useSelector(
    ({ game: { playerField } }: RootState) => ({
      playerField,
    })
  )

  const dispatch = useDispatch<AppDispatch>()

  const onClick = useCallback((coords: Coords) => {
    dispatch(actions.openCell(coords))
    dispatch(runTimer())
  }, [])

  const onContextMenu = useCallback((coords: Coords) => {
    dispatch(actions.setFlag(coords))
    dispatch(runTimer())
  }, [])

  return (
    <GridComponent onClick={onClick} onContextMenu={onContextMenu}>
      {playerField}
    </GridComponent>
  )
}
