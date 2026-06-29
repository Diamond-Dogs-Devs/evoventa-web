import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { default as CardModal } from './CardModal';

const Story: Meta<typeof CardModal> = {
  component: CardModal,
  title: 'CardModal',
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of the modal',
    },
    open: {
      description: 'Controls whether the modal is open or closed',
    },
    children: {
      description: 'The content of the modal',
    },
  },
};

export default Story;

export const Primary = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <CardModal {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

Primary.args = {
  title: 'Modal Title',
  open: false,
  children: 'This is the content of the modal.',
};
