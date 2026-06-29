import type { Meta } from '@storybook/react';
import Alert from './Alert';

const Story: Meta<typeof Alert> = {
  component: Alert,
  title: 'Alert',
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Custom CSS class for the Alert component.',
    },
    message: {
      description: 'The message or content of the Alert component.',
    },
    showIcon: {
      description: 'Indicates whether to display an icon in the Alert.',
    },
    type: {
      description:
        'The type of the Alert, e.g., "success," "info," "warning," "error."',
    },
    actions: {
      description: 'The actions to be executed when the Alert is clicked.',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    className: 'custom-classname',
    message: 'Heading children',
    showIcon: true,
    type: 'success',
    actions: null,
  },
};
