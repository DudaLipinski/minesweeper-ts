import { Story, Meta } from '@storybook/react'
import { Cell, CellProps } from './Cell'

export default {
  title: 'Grid/Cell',
  component: Cell,
  argTypes: {
    coords: { defaultValue: [1, 1] },
  },
} as Meta

const Template: Story<CellProps> = (args) => <Cell {...args} />

export const CellClosed = Template.bind({})
CellClosed.args = {
  children: 10,
}

export const CellIsEmpty = Template.bind({})
CellIsEmpty.args = {
  children: 0,
}

export const CellWithBomb = Template.bind({})
CellWithBomb.args = {
  children: 9,
}

export const CellWithFlag = Template.bind({})
CellWithFlag.args = {
  children: 11,
}

export const CellWithWeakFlag = Template.bind({})
CellWithWeakFlag.args = {
  children: 12,
}

export const CellWithNumberOne = Template.bind({})
CellWithNumberOne.args = {
  children: 1,
}

export const CellWithNumberThree = Template.bind({})
CellWithNumberThree.args = {
  children: 3,
}

export const CellWithNumberFive = Template.bind({})
CellWithNumberFive.args = {
  children: 5,
}

export const CellWithNumberEight = Template.bind({})
CellWithNumberEight.args = {
  children: 8,
}
