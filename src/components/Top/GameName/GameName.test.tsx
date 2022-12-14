import { render, screen } from '@testing-library/react'
import { GameName } from './GameName'

describe('GameName title', () => {
  it('Should return the game name', () => {
    render(<GameName>Minesweeper</GameName>)
    expect(screen.getByText('Minesweeper')).toBeInTheDocument()
  })
})
