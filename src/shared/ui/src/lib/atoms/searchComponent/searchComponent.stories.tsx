import type { Meta } from '@storybook/react';
import { SearchComponent } from './SearchComponent';

const Story: Meta<typeof SearchComponent> = {
  component: SearchComponent,
  title: 'SearchComponent',
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'The label for the searchComponent input',
    },
    name: {
      description: 'The name of the searchComponent input field',
    },
    className: {
      description: 'Additional CSS classes for styling',
    },
    error: {
      description: 'Error message text, if any',
    },
  },
};

export default Story;

export const Primary = {
  args: {
    label: 'Buscar:',
    name: 'custom-classname',
    className: '',
    error: '',
  },
};
