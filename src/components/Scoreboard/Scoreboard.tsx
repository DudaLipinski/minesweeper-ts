import { FC } from 'react'
import styled from 'styled-components'
import { Reset } from './Reset/Reset'
import { Counter } from './Counter/Counter'

export interface ScoreboardProps {
  time: string
  levels: string[]
  onReset: () => void
  mines: string
}

export const Scoreboard: FC<ScoreboardProps> = ({
  time,
  levels,
  onReset,
  mines,
}) => (
  <Wrapper>
    <Reset onReset={onReset} />
    <Counter children="10" />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`
