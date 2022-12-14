import { memo } from 'react'
import { useMouseDown } from 'src/components/hooks/useMouseDown'
import styled from 'styled-components'

const Button = styled.button`
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

export const Reset = memo(({ onReset }: ResetProps) => {
  const [mouseDown, onMouseDown, onMouseUp] = useMouseDown()

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
})

Reset.displayName = 'Reset'
