import { ChangeEvent, memo } from 'react'
import styled from 'styled-components'

const Select = styled.select`
  margin: 0;
  border-radius: 0;
  border: 0.15vw solid;
  border-color: white #9e9e9e #9e9e9e white;
  background-color: #d1d1d1;
`

const Option = styled.option`
  font-weight: normal;
  display: block;
  white-space: nowrap;
  min-height: 1.2em;
  padding: 0 0.2vw 0.2vw;
`
export interface LevelProps {
  children: string[]
  value?: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const Level = memo(({ children, value, onChange }: LevelProps) => (
  <Select onChange={onChange} value={value}>
    {children.map((item: string) => (
      <Option key={item} value={item}>
        {item}
      </Option>
    ))}
  </Select>
))

Level.displayName = 'Level'
