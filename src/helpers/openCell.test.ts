import { CellState } from './Field'
import { openCell } from './openCell'

const { hidden: h, bomb: b } = CellState

describe('Open cell action', () => {
  describe('Simple cases with loose', () => {
    it('Should open cell with the bomb', () => {
      expect(() =>
        openCell(
          [1, 1],
          [
            [h, h],
            [h, h],
          ],
          [
            [1, 1],
            [1, b],
          ]
        )
      ).toThrow('Game Over')
    })
  })
  describe('Should open cell with state equals 1', () => {
    const playerField = openCell(
      [1, 1],
      [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ],
      [
        [1, 1, 0],
        [9, 1, 0],
        [1, 1, 0],
      ]
    )
    expect(playerField).toStrictEqual([
      [h, h, h],
      [h, 1, h],
      [h, h, h],
    ])
  })
  describe('Should open cell with state equals 3', () => {
    const playerField = openCell(
      [1, 1],
      [
        [h, h, h],
        [h, h, h],
        [h, h, h],
      ],
      [
        [1, 1, 0],
        [9, 3, 0],
        [1, 1, 0],
      ]
    )
    expect(playerField).toStrictEqual([
      [h, h, h],
      [h, 3, h],
      [h, h, h],
    ])
  })
})
