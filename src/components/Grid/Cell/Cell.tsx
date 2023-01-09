import * as Styled from './Cell.styles'
import React, { memo } from 'react'
import { Cell as CellType, CellState, Coords } from './../../../core/Field'
import { useMouseDown } from 'src/components/hooks/useMouseDown'
export interface CellProps {
  children: CellType
  coords: Coords
  onClick: (coords: Coords) => void
  onContextMenu: (coords: Coords) => void
}
export const isActiveCell = (cell: CellType): boolean =>
  [CellState.hidden, CellState.flag, CellState.weakFlag].includes(cell)

export const areEqual = (
  prevProps: CellProps,
  nextProps: CellProps
): boolean => {
  const areEqualCoords =
    prevProps.coords.filter((coord, index) => nextProps.coords[index] !== coord)
      .length === 0

  return (
    prevProps.children === nextProps.children &&
    areEqualCoords &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.onContextMenu === nextProps.onContextMenu
  )
}

export const Cell = memo(({ children, coords, ...rest }: CellProps) => {
  const [mouseDown, onMouseDown, onMouseUp] = useMouseDown()
  const onClick = () => rest.onClick(coords)

  const onContextMenu = (element: React.MouseEvent<HTMLDivElement>) => {
    element.preventDefault()
    if (isActiveCell(children)) {
      rest.onContextMenu(coords)
    }
  }

  const props = {
    onClick,
    onContextMenu,
    onMouseDown,
    onMouseUp,
    onMouseLeave: onMouseUp,
    mouseDown,
    'data-testid': `${coords}`,
    role: 'cell',
  }
  return <ComponentsMap {...props}>{children}</ComponentsMap>
}, areEqual)

Cell.displayName = 'Cell'
interface ComponentsMapProps {
  children: CellType
  onClick: (elem: React.MouseEvent<HTMLDivElement>) => void
  onContextMenu: (elem: React.MouseEvent<HTMLDivElement>) => void
  onMouseDown: () => void
  onMouseUp: () => void
  onMouseLeave: () => void
  mouseDown: boolean
  'data-testid'?: string
  role: string
}

const ComponentsMap = ({ children, ...rest }: ComponentsMapProps) => {
  const nonActiveProps = {
    onContextMenu: rest.onContextMenu,
    'data-testid': rest['data-testid'],
    role: rest.role,
  }
  switch (children) {
    case CellState.hidden:
      return <Styled.ClosedFrame {...rest}>{children}</Styled.ClosedFrame>
    // case CellState.empty:
    //   return <RevealedFrame {...nonActiveProps} />;
    case CellState.bomb:
      return (
        <Styled.BombFrame {...nonActiveProps}>
          <Styled.Bomb data-testid={`bomb_${rest['data-testid']}`} />
        </Styled.BombFrame>
      )
    case CellState.flag:
      return (
        <Styled.ClosedFrame {...rest}>
          <Styled.Flag data-testid={`flag_${rest['data-testid']}`}>
            {children}
          </Styled.Flag>
        </Styled.ClosedFrame>
      )
    case CellState.weakFlag:
      return (
        <Styled.ClosedFrame {...rest}>
          Styled.
          <Styled.WeakFlag data-testid={`weakFlag_${rest['data-testid']}`} />
        </Styled.ClosedFrame>
      )
    default:
      return (
        <Styled.RevealedFrame {...nonActiveProps}>
          {children}
        </Styled.RevealedFrame>
      )
  }
}
