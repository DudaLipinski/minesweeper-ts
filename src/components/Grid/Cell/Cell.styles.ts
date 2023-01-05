import styled from 'styled-components'
import { Cell as CellType } from './../../../core/Field'

interface ClosedFrameProps {
  mouseDown?: boolean
}

export const transparent = 'rgba(0,0,0,0)'
export const colors: { [key in CellType]: string } = {
  0: transparent,
  1: '#2a48ec',
  2: '#2bb13d',
  3: '#ec6561',
  4: '#233db7',
  5: '#a6070f',
  6: '#e400af',
  7: '#906a02',
  8: '#fa0707',
  9: transparent,
  10: transparent,
  11: transparent,
  12: transparent,
}

export const ClosedFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 18px;
  height: 18px;
  color: transparent;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  &:hover {
    filter: brightness(1.1);
  }
  border-color: ${({ mouseDown = false }: ClosedFrameProps) =>
    mouseDown ? 'transparent' : 'white #9e9e9e #9e9e9e white'};
`
export const RevealedFrame = styled(ClosedFrame)`
  border-color: #dddddd;
  cursor: default;
  color: ${({ children }) => colors[children as CellType] ?? transparent};
  &:hover {
    filter: brightness(1);
  }
`
export const Bomb = styled.div`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background-color: #333;
`
export const BombFrame = styled(RevealedFrame)`
  background-color: #ec433c;
`

export const Flag = styled.div`
  width: 0px;
  height: 0px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #ec433c;
`

export const WeakFlag = styled(Flag)`
  border-left: 8px solid #f19996;
`
