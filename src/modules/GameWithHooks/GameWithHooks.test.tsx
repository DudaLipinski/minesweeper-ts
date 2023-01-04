import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import { GameWithHooks } from './GameWithHooks'

const mockOnClick = jest.fn()
const mockOnChangeLevel = jest.fn()
const mockOnReset = jest.fn()
const mockOnContextMenu = jest.fn()

jest.mock('../../hooks/useGame', () => ({
  useGame: () => ({
    level: 'beginner',
    isGameOver: true,
    isWin: false,
    settings: [9, 10],
    playerField: [
      [10, 10],
      [10, 10],
    ],
    onClick: mockOnClick,
    onContextMenu: mockOnContextMenu,
    onChangeLevel: mockOnChangeLevel,
    onReset: mockOnReset,
  }),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('GameWithHooks test cases', () => {
  it('Cell click works fine', () => {
    render(<GameWithHooks />)
    userEvent.click(screen.getByTestId('0,0'))
    expect(mockOnClick).toHaveBeenCalled()
  })
  it('Reset handler works fine', () => {
    render(<GameWithHooks />)
    userEvent.click(screen.getByRole('button'))
    expect(mockOnReset).toHaveBeenCalled()
  })
  it('Change level works fine', () => {
    render(<GameWithHooks />)
    userEvent.selectOptions(screen.getByRole('combobox'), 'intermediate')
    expect(mockOnChangeLevel).toHaveBeenCalled()
  })
  it('Game over reset the game state', () => {
    render(<GameWithHooks />)
    userEvent.click(screen.getByText('🙁'))
    expect(mockOnReset).toHaveBeenCalled()
  })
  it('Should handler context menu when the right mouse button is clicked', () => {
    render(<GameWithHooks />)
    userEvent.click(screen.getByTestId('0,0'), { button: 2 })
    expect(mockOnContextMenu).toHaveBeenCalled()
  })
})
