import type { Meta } from "@storybook/react";
import Pagination from "./pagination";

const Story: Meta<typeof Pagination> = {
  component: Pagination,
  title: "Pagination",
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      description: "Current page.",
    },
    totalPages: {
      description: "Total number of pages.",
    },
    pageSize: {
      description: "Current page size.",
    },
    pageSizeOptions: {
      description: "Options for the page size select.",
    },
    onPageChange: {
      action: "pageChanged",
    },
    onPageSizeChange: {
      action: "pageSizeChanged",
    },
  },
};

export default Story;

export const Primary = (args: React.ComponentProps<typeof Pagination>) => (
  <Pagination {...args} />
);

Primary.args = {
  currentPage: 1,
  totalPages: 4,
  pageSize: 10,
  pageSizeOptions: [10, 20, 50],
};
