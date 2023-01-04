import { getNeighborsItems, checkItemField } from './CellsManipulator'
import { detectSolvedPuzzle } from './DetectedSolvedPuzzle'
import { Coords, Field, CellState } from './Field'

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean, number] => {
  const { empty, hidden, bomb } = CellState

  const [y, x] = coords
  const gameCell = gameField[y][x]

  if (gameCell === bomb) {
    throw new Error('Game Over')
  }

  if (gameCell === empty) {
    playerField[y][x] = gameCell

    const items = getNeighborsItems(coords)

    for (const [y, x] of Object.values(items)) {
      if (checkItemField([y, x], gameField)) {
        const playerCell = playerField[y][x]
        const gameCell = gameField[y][x]

        if (playerCell === hidden && gameCell !== bomb) {
          ;[playerField] = openCell([y, x], playerField, gameField)
        }
      }
    }
  }

  playerField[y][x] = gameCell

  const [isSolved, flagCounter] = detectSolvedPuzzle(playerField, gameField)

  return [playerField, isSolved, flagCounter]
}
