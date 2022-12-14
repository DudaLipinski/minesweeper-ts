import { FC } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Reset } from './Reset'

describe('Reset button check', () => {
  const ResetWithDummyHandlerOnReset: FC = () => <Reset onReset={() => null} />
  it('Should render elements with default state', () => {
    render(<Reset onReset={() => null} />)
    expect(screen.getByText('🙂')).toBeInTheDocument()
  })
  it('onReset handler should be called', () => {
    const onReset = jest.fn()
    render(<Reset onReset={onReset} />)
    fireEvent.click(screen.getByText('🙂'))

    expect(onReset).toBeCalled()
  })
  it('Should change state when onMouseDown and onMouseLeave events happened', () => {
    render(<ResetWithDummyHandlerOnReset />)

    fireEvent.mouseDown(screen.getByText('🙂'))
    expect(screen.getByText('😯')).toBeInTheDocument()

    fireEvent.mouseUp(screen.getByText('😯'))
    expect(screen.getByText('🙂')).toBeInTheDocument()
  })
})
