import { ReactNode } from 'react'
import styled from 'styled-components'

export interface GameAreaProps {
  children: ReactNode
}

export const GameArea = ({ children }: GameAreaProps) => (
  <Frame>{children}</Frame>
)

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 6px solid #e3e3ee;
  background-color: #e3e3ee;
`
