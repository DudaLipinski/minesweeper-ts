import { CellState, Field } from './Field'
import {
  incrementNeighbors,
  getNeighborsItems,
  checkItemField,
} from './CellsManipulator'

const { empty, bomb } = CellState

describe('Check increment neighbors', () => {
  describe('incrementNeighbors', () => {
    it('Field with only one item', () => {
      expect(incrementNeighbors([0, 0], [[bomb]])).toStrictEqual([[bomb]])
    })
    it('Should return a field 2x2 with two bombs', () => {
      expect(
        incrementNeighbors(
          [0, 0],
          [
            [bomb, empty],
            [empty, bomb],
          ]
        )
      ).toStrictEqual([
        [bomb, 1],
        [1, bomb],
      ])
    })
    it('Should return a field 3x3 with one centered bomb', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [empty, empty, empty],
            [empty, bomb, empty],
            [empty, empty, empty],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, bomb, 1],
        [1, 1, 1],
      ])
    })
    it('Should return a field 3x3 with two bombs', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [0, 1, bomb],
            [0, bomb, 1],
            [0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [1, 2, bomb],
        [1, bomb, 2],
        [1, 1, 1],
      ])
    })
  })
})

describe('Check neighbors selectors', () => {
  it('Should check [0, 0] coords', () => {
    expect(getNeighborsItems([0, 0])).toStrictEqual({
      top: [-1, 0],
      topRight: [-1, 1],
      right: [0, 1],
      rightBottom: [1, 1],
      bottom: [1, 0],
      bottomLeft: [1, -1],
      left: [0, -1],
      leftTop: [-1, -1],
    })
  })
  it('Should check [2, 2] coords', () => {
    expect(getNeighborsItems([2, 2])).toStrictEqual({
      top: [1, 2],
      topRight: [1, 3],
      right: [2, 3],
      rightBottom: [3, 3],
      bottom: [3, 2],
      bottomLeft: [3, 1],
      left: [2, 1],
      leftTop: [1, 1],
    })
  })
})

describe('checkIncrementField', () => {
  describe('Increment with a basic field', () => {
    const field: Field = [[empty]]

    it('Should return false when Y is out of range', () => {
      expect(checkItemField([1, 0], field)).toBe(false)
    })
    it('Should return false when X is out of range', () => {
      expect(checkItemField([0, -1], field)).toBe(false)
    })
    it('Should return false when X and Y are out of range', () => {
      expect(checkItemField([0, 0], field)).toBe(true)
    })
  })
  describe('Increment with big field', () => {
    const field: Field = [
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
      [empty, empty, empty, empty, empty],
    ]

    it('Should return false when Y', () => {
      expect(checkItemField([0, 5], field)).toBe(false)
    })
    it('Should return false when X is out of range', () => {
      expect(checkItemField([5, 0], field)).toBe(false)
    })
    it('Should return false when X is out of range with negative index', () => {
      expect(checkItemField([-1, 0], field)).toBe(false)
    })
    it('Should return true when X and Y are in range', () => {
      expect(checkItemField([3, 4], field)).toBe(true)
    })
  })
})

// [
//   [empty, empty, empty, empty, empty],
//   [empty, empty, empty, empty, empty],
//   [empty, empty, bomb, empty, empty],
//   [empty, empty, empty, empty, empty],
//   [empty, empty, empty, empty, empty],
// ]
