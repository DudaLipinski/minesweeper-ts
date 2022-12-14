import {
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
} from './Field'

const { empty, bomb, hidden } = CellState

describe('Field Generator', () => {
  describe('emptyFieldGenerator tests', () => {
    it('2x2', () => {
      expect(generateFieldWithDefaultState(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ])
    })
    it('3x3', () =>
      expect(generateFieldWithDefaultState(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]))
    it('3x3 with hidden state', () =>
      expect(generateFieldWithDefaultState(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]))
  })
  describe('Simple cases', () => {
    it('Wrong density', () => {
      const errorText = 'Probability must be between 0 and 1'
      expect(() => fieldGenerator(1, -1)).toThrow(errorText)
      expect(() => fieldGenerator(1, 2)).toThrow(errorText)
    })
    it('Smallest possible field without mine', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]])
    })
    it('Big field without mine', () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ])
    })
    it('Smallest possible field with mine', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]])
    })
    it('2x2 field with mines', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ])
    })
  })
})
