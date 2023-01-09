import { memo } from 'react'
import styled from 'styled-components'

import { Coords, Field } from './../../core/Field'
import { Cell } from './Cell/Cell'

export interface GridProps {
  children: Field
  onClick: (coords: Coords) => void
  onContextMenu: (coords: Coords) => void
}

export const Grid = memo(({ children, ...rest }: GridProps) => (
  <Wrapper size={children.length}>
    {children.map((row, y) =>
      row.map((cell, x) => (
        <Cell key={`${y}_${x}_${cell}`} coords={[y, x]} {...rest}>
          {cell}
        </Cell>
      ))
    )}
  </Wrapper>
))

Grid.displayName = 'Grid'

interface WrapperProps {
  size: number
}

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, auto);
  width: max-content;
  padding: 1vw;
`
