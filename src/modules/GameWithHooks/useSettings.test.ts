import { renderHook } from '@testing-library/react'
import { act } from '@testing-library/react'
import { GameSettings } from '../GameSettings'
import { useSettings } from './useSettings'

describe('useSettings test case', () => {
  it('Check default settings', () => {
    const { result } = renderHook(useSettings)

    expect(result.current.settings).toEqual(GameSettings.beginner)
    expect(result.current.level).toBe('beginner')
  })
  it('Check setLevel to intermediate', () => {
    const { result } = renderHook(useSettings)

    act(() => result.current.setLevel('intermediate'))
    expect(result.current.level).toBe('intermediate')
  })
})
