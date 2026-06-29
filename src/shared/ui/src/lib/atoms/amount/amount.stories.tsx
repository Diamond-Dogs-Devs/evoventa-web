import type { Meta } from '@storybook/react';
import Component from './amount';

const Story: Meta<typeof Component> = {
  component: Component,
  title: 'Amount',
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes for styling',
    },
    currency: {
      description: 'The currency for the amount (e.g., "CLP")',
    },
    amount: {
      description: 'The amount value',
    },
    decimalCount: {
      description: 'The number of decimal places to display',
    },
    hideCurrency: {
      description: 'Indicates whether to hide the currency symbol',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    className: 'custom-classname',
    currency: 'CLP',
    amount: 25000,
    decimalCount: 2,
    hideCurrency: false,
  },
};
