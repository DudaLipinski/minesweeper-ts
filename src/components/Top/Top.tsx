import styled from 'styled-components'
import { Legend, LegendProps } from './Legend/Legend'
import { GameName, GameNameProps } from './GameName/GameName'
import { memo } from 'react'

export type TopProps = LegendProps & GameNameProps

export const Top = memo(({ children, ...legendProps }: TopProps) => (
  <Header>
    <GameName>{children}</GameName>
    <Legend {...legendProps} />
  </Header>
))

Top.displayName = 'Top'

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`
