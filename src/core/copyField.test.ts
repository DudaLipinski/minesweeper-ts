import { copyField } from './copyField'
import { Field } from './Field'
import { fieldGenerator } from './Field'

describe('Check copyField', () => {
  it('Object.is should be different, data is the same', () => {
    const prevField = fieldGenerator(9, 0.1) as Field
    const nextField = copyField(prevField)

    expect(prevField).not.toBe(nextField)
    expect(prevField).toEqual(nextField)
  })
})
