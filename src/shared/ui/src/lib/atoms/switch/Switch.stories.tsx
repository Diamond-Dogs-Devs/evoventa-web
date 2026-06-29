import type { Meta } from '@storybook/react';
import { default as Switch } from './Switch';

const Story: Meta<typeof Switch> = {
  component: Switch,
  title: 'Switch',
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label associated with the switch.',
    },
    isChecked: {
      description: 'Indicates whether the switch is checked (on) or not (off).',
    },
    disabled: {
      description: 'Specifies if the switch is disabled or not.',
    },
    labelPosition: {
      description:
        'The position of the label in relation to the switch (left or right).',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    label: 'Enable Switch',
    isChecked: false,
    disabled: false,
    labelPosition: 'left',
  },
};
