import type { Meta } from '@storybook/react';
import { default as Spinner } from './spinner';

const Story: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'The size of the spinner. Can be "sm", "md", or "lg".',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    size: 'md',
  },
};
