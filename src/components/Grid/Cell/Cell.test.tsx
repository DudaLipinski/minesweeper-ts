/* eslint-disable jest/no-conditional-expect */
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import { CellState, Coords, Cell as CellType } from './../../../core/Field'
import { areEqual, Cell } from './Cell'

describe('Cell component check', () => {
  const coords: Coords = [1, 1]

  const props = {
    coords,
    flagCounter: 0,
    bombs: 10,
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
  it('Check areEqual', () => {
    const prevProps = {
      ...props,
      children: 0 as CellType,
    }

    expect(areEqual(prevProps, { ...prevProps })).toBe(true)

    expect(areEqual(prevProps, { ...prevProps, coords: [2, 1] })).toBe(false)
    expect(areEqual(prevProps, { ...prevProps, coords: [1, 2] })).toBe(false)
    expect(areEqual(prevProps, { ...prevProps, coords: [2, 2] })).toBe(false)
    expect(areEqual(prevProps, { ...prevProps, coords: [1, 0] })).toBe(false)

    expect(areEqual(prevProps, { ...prevProps, children: 1 as CellType })).toBe(
      false
    )
    expect(areEqual(prevProps, { ...prevProps, onClick: jest.fn() })).toBe(
      false
    )
    expect(
      areEqual(prevProps, { ...prevProps, onContextMenu: jest.fn() })
    ).toBe(false)
  })
})
