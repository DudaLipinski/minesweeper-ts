import { ReactNode } from 'react'
import styled from 'styled-components'

export interface WrapperProps {
  children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => <Frame>{children}</Frame>

const Frame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
