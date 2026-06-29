import type { Meta } from '@storybook/react';
import Component from './accordion';

const Story: Meta<typeof Component> = {
  component: Component,
  title: 'Accordion',
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of the accordion',
    },

    description: {
      description: 'A short description of the accordion',
    },
    children: {
      description: 'The content of the accordion',
    },
    className: {
      description: 'Additional CSS classes for styling the accordion',
    },
    titleClassName: {
      description: 'Additional CSS classes for styling the title',
    },
    contentClassName: {
      description: 'Additional CSS classes for styling the content',
    },
    variant: {
      description: 'The variant of the accordion (e.g., "default")',
    },
    collapse: {
      description: 'Indicates whether the accordion is initially collapsed',
    },
    loading: {
      description: 'Indicates whether data is loading',
    },
    onOpenCollapse: {
      description: 'A callback function for opening the accordion',
    },
    onCloseCollapse: {
      description: 'A callback function for closing the accordion',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    title: 'Titulo',
    description: 'Descripción',
    children: 'Contenido',
    className: 'custom-classname',
    titleClassName: 'custom-classname',
    contentClassName: 'custom-classname',
    variant: 'default',
    collapse: true,
    loading: false,
    onOpenCollapse: () => null,
    onCloseCollapse: () => null,
  },
};
