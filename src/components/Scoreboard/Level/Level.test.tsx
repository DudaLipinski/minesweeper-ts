import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChangeEvent } from 'react'
import { Level } from './Level'

describe('Select Level', () => {
  it('Should display the correct number of options', () => {
    render(
      <Level
        children={['beginner', 'intermediate', 'expert']}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {}}
      />
    )
    expect(screen.getAllByRole('option').length).toBe(3)
  })
  it('Should allow user to change the level', () => {
    render(
      <Level
        children={['beginner', 'intermediate', 'expert']}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {}}
      />
    )

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'expert' })
    )

    expect(
      screen.getByRole<HTMLOptionElement>('option', { name: 'expert' }).selected
    ).toBe(true)
  })
})
