import * as Styled from './Cell.styles'
import { Cell as CellType, CellState, Coords } from '../../../helpers/Field'
import { useMouseDown } from 'src/hooks/useMouseDown'

export interface CellProps {
  children: CellType
  coords: Coords
  onClick: (coords: Coords) => void
  onContextMenu: (coords: Coords) => void
}

export const checkCellIsActive = (cell: CellType): boolean =>
  [CellState.hidden, CellState.flag, CellState.weakFlag].includes(cell)

export const Cell = ({ children, coords, ...rest }: CellProps) => {
  const [mouseDown, setMouseDown, setMouseUp] = useMouseDown()

  const isActiveCell = checkCellIsActive(children)

  const onClick = () => {
    if (isActiveCell) {
      rest.onClick(coords)
    }
  }

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (isActiveCell) {
      rest.onContextMenu(coords)
    }
  }

  const onMouseDown = () => {
    if (isActiveCell) {
      setMouseDown()
    }
  }

  const onMouseUp = () => {
    if (isActiveCell) {
      setMouseUp()
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
  }

  return <ComponentsMap {...props}>{children}</ComponentsMap>
}
interface ComponentsMapProps {
  children: CellType
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  onContextMenu: (event: React.MouseEvent<HTMLDivElement>) => void
  onMouseDown: () => void
  onMouseUp: () => void
  onMouseLeave: () => void
  mouseDown: boolean
  'data-testid'?: string
}

const ComponentsMap = ({ children, ...rest }: ComponentsMapProps) => {
  switch (children) {
    case CellState.empty:
      return <Styled.RevealedFrame {...rest}></Styled.RevealedFrame>
    case CellState.hidden:
      return <Styled.ClosedFrame {...rest} />
    case CellState.bomb:
      return (
        <Styled.BombFrame {...rest}>
          <Styled.Bomb />
        </Styled.BombFrame>
      )
    case CellState.flag:
      return (
        <Styled.ClosedFrame {...rest}>
          <Styled.Flag />
        </Styled.ClosedFrame>
      )
    case CellState.weakFlag:
      return (
        <Styled.ClosedFrame {...rest}>
          <Styled.WeakFlag />
        </Styled.ClosedFrame>
      )
    default:
      return <Styled.RevealedFrame {...rest}>{children}</Styled.RevealedFrame>
  }
}
