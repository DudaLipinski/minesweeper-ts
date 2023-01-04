import { getNeighborsItems, checkItemField } from './CellsManipulator'
import { Coords, Field, CellState } from './Field'

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const { empty, hidden, bomb } = CellState
  const [y, x] = coords
  const gameCell = gameField[y][x]

  if (gameCell === bomb) {
    throw new Error('Game Over')
  }

  if (gameCell === empty) {
    playerField[y][x] = gameCell

    const items = getNeighborsItems(coords)

    for (const coords of Object.values(items)) {
      if (checkItemField(coords, gameField)) {
        const [y, x] = coords

        const gameCell = gameField[y][x]
        const playerCell = playerField[y][x]

        if (gameCell === empty && playerCell === hidden) {
          playerField = openCell(coords, playerField, gameField)
        }

        if (gameCell < bomb) {
          playerField[y][x] = gameCell
        }
      }
    }
  }

  playerField[y][x] = gameCell

  return playerField
}
