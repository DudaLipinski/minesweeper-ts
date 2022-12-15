import { Story, Meta } from '@storybook/react'
import { Legend, LegendProps } from './Legend'

export default {
  title: 'Top/Legend',
  component: Legend,
} as Meta

const Template: Story<LegendProps> = (args) => <Legend {...args} />
export const LegendExample = Template.bind({})

LegendExample.args = {
  feature: 'Flag',
  firstAction: 'ctrl',
  secondAction: 'click',
}
