import styled from 'styled-components'

export interface LegendProps {
  feature: string
  firstAction: string
  secondAction: string
}

export const Legend = ({ feature, firstAction, secondAction }: LegendProps) => (
  <Parent>
    <strong>{feature} </strong>
    <FlagComboParent>
      <FirstAction>{firstAction} </FirstAction>
      {secondAction && <SecondAction>+ {secondAction}</SecondAction>}
    </FlagComboParent>
  </Parent>
)

const FlagComboParent = styled.code`
  background: #e3e3e3;
`

const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`

const FirstAction = styled.span`
  color: #ec433c;
`

const SecondAction = styled.span`
  color: #2a48ec;
`
