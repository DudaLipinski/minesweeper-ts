import { detectSolvedPuzzle } from './DetectedSolvedPuzzle'
import { Coords, Field, CellState } from './Field'

export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean, number] => {
  const [y, x] = coords
  const cell = playerField[y][x]

  const { flag, weakFlag, hidden } = CellState

  switch (cell) {
    case flag:
      playerField[y][x] = weakFlag
      break
    case weakFlag:
      playerField[y][x] = hidden
      break
    case hidden:
      playerField[y][x] = flag
      break
  }

  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField)

  return [playerField, isSolved, flagCounter]
}
