import { useState } from 'react'
import styled from 'styled-components'

const Button = styled.div`
  width: fit-content;
  font-size: 1.5vw;
  cursor: pointer;
  font-weight: 700;
  border-width: 0.15vw;
  border-style: solid;
  background-color: #d1d1d1;
  border-color: white #9e9e9e #9e9e9e white;
`

export interface ResetProps {
  onReset: () => void
}

export const Reset = ({ onReset }: ResetProps) => {
  const [mouseDown, setMouseDown] = useState(false)

  const onMouseDown = () => setMouseDown(true)
  const onMouseUp = () => setMouseDown(false)

  return (
    <Button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onReset}
    >
      {mouseDown ? '😯' : '🙂'}
    </Button>
  )
}
