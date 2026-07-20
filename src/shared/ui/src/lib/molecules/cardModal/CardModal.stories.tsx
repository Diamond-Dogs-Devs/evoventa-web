import React, { useState } from "react";
import type { Meta } from "@storybook/react";
import { default as CardModal } from "./CardModal";

const Story: Meta<typeof CardModal> = {
  component: CardModal,
  title: "CardModal",
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "The title of the modal",
    },
    open: {
      description: "Controls whether the modal is open or closed",
    },
  },
};

export default Story;

export const Primary = (args: React.ComponentProps<typeof CardModal>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <CardModal {...args} open={open} />
    </>
  );
};

Primary.args = {
  title: "Example Modal",
};
