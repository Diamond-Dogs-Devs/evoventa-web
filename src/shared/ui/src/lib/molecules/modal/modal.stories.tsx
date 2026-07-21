import React, { useState } from "react";
import type { Meta } from "@storybook/react";
import { Modal } from "./modal";

const Story: Meta<typeof Modal> = {
  component: Modal,
  title: "Modal",
  tags: ["autodocs"],
};

export default Story;

export const Primary = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <Modal {...args} open={open} />
    </>
  );
};

Primary.args = {
  title: "Example Modal",
};
