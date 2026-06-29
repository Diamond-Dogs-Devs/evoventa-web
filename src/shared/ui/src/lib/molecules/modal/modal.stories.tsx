import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Modal } from './modal';

const Story: Meta<typeof Modal> = {
  component: Modal,
  title: 'Modal',
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'The title of the modal',
    },
    open: {
      description: 'Indicates whether the modal is open',
    },
    children: {
      description: 'The content of the modal',
    },
    onClose: {
      description: 'A callback function for closing the modal',
    },
  },
};

export default Story;

export const Primary = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

Primary.args = {
  title: 'Modal Title',
  open: false,
  children: <p>This is the content of the modal.</p>,
};
