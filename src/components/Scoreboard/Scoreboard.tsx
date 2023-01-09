import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { Reset } from './Reset/Reset'
import { Counter } from './Counter/Counter'
import { Level } from './Level/Level'

export interface ScoreboardProps {
  time: string
  levels: string[]
  defaultLevel?: string
  onReset: () => void
  onChangeLevel: (event: ChangeEvent<HTMLSelectElement>) => void
  bombs: string
}

export const Scoreboard = ({
  time,
  levels,
  onReset,
  bombs,
  defaultLevel,
  onChangeLevel: onChange,
}: ScoreboardProps) => (
  <Wrapper>
    <Counter>{time}</Counter>
    <Level onChange={onChange} value={defaultLevel}>
      {levels}
    </Level>
    <Reset onReset={onReset} />
    <Counter>{bombs}</Counter>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  width: max-content;
  padding-bottom: 2vw;
  justify-content: space-between;
`
