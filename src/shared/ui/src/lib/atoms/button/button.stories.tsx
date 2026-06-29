import type { Meta } from '@storybook/react';
import Component from './button';

const Story: Meta<typeof Component> = {
  component: Component,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    href: {
      description:
        "The URL to link to when the button is clicked (if it's an anchor)",
    },
    children: {
      description: 'The content of the button',
    },
    className: {
      description: 'Additional CSS classes for styling',
    },
    variant: {
      description: 'The button variant (e.g., "fill")',
    },
    color: {
      description: 'The color of the button',
    },
    size: {
      description: 'The size of the button (e.g., "md")',
    },
    active: {
      description: 'Indicates if the button is active',
    },
    type: {
      description: 'The type of the button element (e.g., "submit")',
    },
    Component: {
      description: 'The HTML element type (e.g., "button")',
    },
    width: {
      description: 'The width of the button',
    },
    loading: {
      description: 'Indicates whether the button is in a loading state',
    },
    disabled: {
      description: 'Indicates whether the button is disabled',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    href: 'custom-href',
    children: 'My button',
    className: 'custom-classname flex justify-center',
    variant: 'fill',
    color: 'secondary',
    size: 'md',
    active: true,
    type: 'submit',
    Component: 'button',
    width: 150,
    loading: false,
    disabled: false,
  },
};
