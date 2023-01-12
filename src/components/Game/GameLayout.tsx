import { ReactNode } from 'react'
import { GameArea } from './GameArea'
import { Wrapper } from './Wrapper'

interface Props {
  top: ReactNode
  children: ReactNode
}

export const GameLayout = ({ top, children }: Props) => (
  <Wrapper>
    {top}
    <GameArea>{children}</GameArea>
  </Wrapper>
)
