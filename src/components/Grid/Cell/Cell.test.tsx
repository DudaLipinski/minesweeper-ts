/* eslint-disable jest/no-conditional-expect */
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { CellState, Coords } from './../../../core/Field'
import { Cell } from './Cell'

describe('Cell component check', () => {
  const coords: Coords = [1, 1]

  const props = {
    coords,
    onClick: jest.fn(),
    onContextMenu: jest.fn(),
  }

  for (let cell = CellState.empty; cell <= CellState.weakFlag; cell++) {
    it(`Check prevent default contextMenu for every cell type ${cell}`, () => {
      render(<Cell {...props}>{cell}</Cell>)

      const cellComp = screen.getByTestId(`${coords}`)

      const contextMenuEvent = createEvent.contextMenu(cellComp)
      fireEvent(cellComp, contextMenuEvent)

      expect(contextMenuEvent.defaultPrevented).toBe(true)
    })
  }
})
