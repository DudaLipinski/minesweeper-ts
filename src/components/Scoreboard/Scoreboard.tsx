import { FC } from 'react'
import styled from 'styled-components'
import { Reset } from './Reset/Reset'

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
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`
