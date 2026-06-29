import { Heading } from './heading';
import type { Meta } from '@storybook/react';

const Story: Meta<typeof Heading> = {
  component: Heading,
  title: 'Heading',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The variant of the heading',
    },
    className: {
      description: 'Custom CSS class name for styling the heading',
    },
    children: {
      description: 'Content of the heading',
    },
    color: {
      description: 'Text color for the heading',
    },
  },
};
export default Story;

export const Primary = {
  args: {
    variant: 'heading',
    className: 'custom-classname',
    children: 'Heading children',
    color: 'primary',
  },
};
