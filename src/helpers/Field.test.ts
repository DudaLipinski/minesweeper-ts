import { CellState, emptyFieldGenerator, fieldGenerator } from './Field'

const { empty, bomb, hidden } = CellState

describe('Field Generator', () => {
  describe('emptyFieldGenerator', () => {
    it('Should return a field 2x2', () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ])
    })
    it('Should return a field 3x3', () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ])
    })
    it('Should return a field 2x2 with hidden state', () => {
      expect(emptyFieldGenerator(2, hidden)).toStrictEqual([
        [hidden, hidden],
        [hidden, hidden],
      ])
    })
  })

  describe('fieldGenerator', () => {
    it('Should throw an error about the wrong density', () => {
      const errorText = 'Density must be between 0 and 1'
      expect(() => fieldGenerator(1, -1)).toThrow(errorText)
      expect(() => fieldGenerator(1, 2)).toThrow(errorText)
    })
    it('Should return the field without bomb', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]])
    })
    it('Should return the smallest field with bomb', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]])
    })
    it('Should return a field 2x2 with bombs', () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ])
    })
    it('Should return a field 2x2 with 50% probability', () => {
      const field = fieldGenerator(2, 0.5)
      const flatField = field.flat()

      const cellsWithBombs = flatField.filter((cell) => cell === bomb)
      const emptyCells = flatField.filter((cell) => cell === empty)

      expect(cellsWithBombs).toHaveLength(2)
      expect(emptyCells).toHaveLength(2)
    })
  })
})
