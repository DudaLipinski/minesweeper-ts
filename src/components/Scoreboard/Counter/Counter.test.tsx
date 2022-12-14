import { render } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter', () => {
  it('Should renders Counter correctly', () => {
    const { asFragment } = render(<Counter children="010" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
