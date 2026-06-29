import type { Meta } from '@storybook/react';
import Component from './card';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

const Story: Meta<typeof Component> = {
  component: Component,
  title: 'Card',
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes for styling',
    },
    titleClassName: {
      description: 'Additional CSS classes for styling the title',
    },
    title: {
      description: 'The title of the card',
    },
    subtitle: {
      description: 'The subtitle of the card',
    },

    description: {
      description: 'The description of the card',
    },
    variant: {
      description: 'The card variant (e.g., "default")',
    },
    loading: {
      description: 'Indicates whether data is loading',
    },
    color: {
      description: 'The color of the card',
    },
    disabled: {
      description: 'Indicates whether the card is disabled',
    },
    children: {
      description: 'The content of the card',
    },
    childrenPadding: {
      description: 'Padding classes for the content',
    },
    actions: {
      description: 'Additional actions or components in the card',
    },
  },
};

export default Story;

export const Primary = {
  args:{
    className:'custom-classname',
    titleClassName:'custom-classname',
    title:"My crd",
    subtitle:"",
    description:'My description',
    variant:"default",
    loading:false,
    color:"white",
    disabled:false,
    children:'My content',
    childrenPadding:'p-8',
    actions:(
      <button className="rounded-full p-2 border w-12 h-12 flex items-center justify-center">
        <ArrowDownCircleIcon width={24} />
      </button>
    ),
  },
};
