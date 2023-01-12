import { FC, memo } from 'react'
import styled from 'styled-components'

const Frame = styled.div`
  display: inline-block;
  padding: 0 0.3vw;
  color: #ec433c;
  border: 0.15vw inset;
  line-height: 2vw;
  letter-spacing: 0.08em;
  background: #333;
  text-shadow: 0 0 0.1vw #ec433c;
  border-width: 0.15vw;
  border-style: solid;
  border-color: white #9e9e9e #9e9e9e white;
`

export interface CounterProps {
  children: string
}

export const Counter: FC<CounterProps> = memo(({ children }) => (
  <Frame>{children}</Frame>
))

Counter.displayName = 'Counter'
