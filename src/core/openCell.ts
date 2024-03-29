import { getNeighborsItems, checkItemField } from './CellsManipulator'
import { copyField } from './copyField'
import { detectSolvedPuzzle } from './detectSolvedPuzzle'
import { Coords, Field, CellState } from './Field'

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] =>
  openCellRecursively(coords, copyField(playerField), gameField)

export const openCellRecursively = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] => {
  const { empty, hidden, bomb, weakFlag, flag } = CellState

  const [y, x] = coords
  const gameCell = gameField[y][x]
  const playerCell = playerField[y][x]

  if (gameCell === bomb) {
    throw new Error('Game Over')
  }

  if (flag === playerCell) {
    return [playerField, false]
  }

  playerField[y][x] = gameCell

  if (gameCell === empty && [hidden, weakFlag].includes(playerCell)) {
    const items = getNeighborsItems(coords)

    for (const [y, x] of Object.values(items)) {
      if (checkItemField([y, x], gameField)) {
        ;[playerField] = openCellRecursively([y, x], playerField, gameField)
      }
    }
  }

  const [isSolved] = detectSolvedPuzzle(playerField, gameField)

  return [playerField, isSolved]
}
