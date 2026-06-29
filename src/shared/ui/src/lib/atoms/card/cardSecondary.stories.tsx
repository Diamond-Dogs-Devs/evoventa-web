import type { Meta } from '@storybook/react';
import Component from './cardSecondary';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

const Story: Meta<typeof Component> = {
  component: Component,
  title: 'CardSecondary',
  tags: ['autodocs'],
};
export default Story;

export const Primary = {
  args: {
    className: 'custom-classname',
    title: 'My title',
    variant: 'warning',
    color: 'primaryAlt',
    loading: false,
    children: 'My content',
    actions: (
      <button className="rounded-full p-2 border w-12 h-12 flex items-center justify-center">
        <ArrowDownCircleIcon width={24} />
      </button>
    ),
  },
};
