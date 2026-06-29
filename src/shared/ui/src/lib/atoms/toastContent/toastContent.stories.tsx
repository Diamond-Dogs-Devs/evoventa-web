import type { Meta } from '@storybook/react';
import { default as ToastContent } from './toastContent';

const Story: Meta<typeof ToastContent> = {
  component: ToastContent,
  title: 'ToastContent',
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of the toast.',
    },
    subtitle: {
      description: 'The subtitle of the toast.',
    },
    description: {
      description: 'The main description text of the toast.',
    },
    type: {
      description:
        'The type of toast, e.g., "success", "info", "warning", or "error".',
    },
  },
};
export default Story;

export const Primary = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
    type: 'success',
  },
};
