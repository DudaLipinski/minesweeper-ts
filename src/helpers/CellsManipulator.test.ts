/* eslint-disable jest/valid-expect */
import { CellState, Field } from './Field'
import {
  incrementNeighbors,
  getNeighborsItems,
  checkItemField,
} from './CellsManipulator'

const { empty: e, bomb: b } = CellState

describe('Check increment neighbors', () => {
  describe('incrementNeighbors', () => {
    it('Field with only one item', () => {
      expect(incrementNeighbors([0, 0], [[b]])).toStrictEqual([[b]])
    })
    it('Should return a field 2x2 with two bombs', () => {
      expect(
        incrementNeighbors(
          [0, 0],
          [
            [b, e],
            [e, b],
          ]
        )
      ).toStrictEqual([
        [b, 1],
        [1, b],
      ])
    })
    it('Should return a field 3x3 with one centered bomb', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [e, e, e],
            [e, b, e],
            [e, e, e],
          ]
        )
      ).toStrictEqual([
        [1, 1, 1],
        [1, b, 1],
        [1, 1, 1],
      ])
    })
    it('Should return a field 3x3 with two bombs', () => {
      expect(
        incrementNeighbors(
          [1, 1],
          [
            [0, 1, b],
            [0, b, 1],
            [0, 0, 0],
          ]
        )
      ).toStrictEqual([
        [1, 2, b],
        [1, b, 2],
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
    const field: Field = [[e]]

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
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
      [e, e, e, e, e],
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
