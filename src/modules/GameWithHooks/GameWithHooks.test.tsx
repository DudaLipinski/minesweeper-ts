import { CellState } from './../../helpers/Field'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GameWithHooks } from './GameWithHooks'

const { empty: e, hidden: h, bomb: b } = CellState
jest.mock('./../../helpers/Field')

describe('Render behavior', () => {
  it('Should render game field by default', () => {
    render(<GameWithHooks />)
    expect(screen.getAllByRole('cell')).toHaveLength(81)
  })
  it('Should render game field as intermediate level', () => {
    render(<GameWithHooks />)
    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
    expect(screen.getAllByRole('cell')).toHaveLength(256)
  })
  it('Should render game field as expert level', () => {
    render(<GameWithHooks />)
    userEvent.selectOptions(screen.getByRole('combobox'), 'expert')
    expect(screen.getAllByRole('cell')).toHaveLength(484)
  })
})

describe('Open cell test cases', () => {
  it('Should open empty cell on the beginner level', () => {
    render(<GameWithHooks />)

    userEvent.click(screen.getByTestId('0,0'))
    expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(18)
  })
  it('Should click to the non-empty cells area', () => {
    render(<GameWithHooks />)
    userEvent.click(screen.getByTestId('0,8'))

    expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(1)
  })
  it('Should check the total cells when the level is changed to intermediate', () => {
    render(<GameWithHooks />)
    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
    expect(screen.getAllByRole('cell')).toHaveLength(256)
  })
  it('Should check the total cells when the level is changed to expert', () => {
    render(<GameWithHooks />)
    userEvent.selectOptions(screen.getByRole('combobox'), 'expert')
    expect(screen.getAllByRole('cell')).toHaveLength(484)
  })
  it('Should reset game handler', () => {
    render(<GameWithHooks />)
    expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(81)

    userEvent.click(screen.getByTestId('0,8'))
    expect(screen.getAllByRole('cell', { name: String(1) })).toHaveLength(1)

    userEvent.click(screen.getByTestId('0,0'))
    expect(screen.getAllByRole('cell', { name: String(e) })).toHaveLength(18)

    userEvent.click(screen.getByRole('button'))
    expect(screen.getAllByRole('cell', { name: String(h) })).toHaveLength(81)
  })
})
