import type { Meta } from '@storybook/react';
import { default as Pagination } from './pagination';

const Story: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Pagination',
  tags: ['autodocs'],
  argTypes: {
    pageSizeOptions: {
      description: 'Options for the page size select.',
    },
    pageIndex: {
      description: 'The current page index.',
    },
    currentLimit: {
      description: 'The current page size or limit.',
    },
    hasPreviousPage: {
      description: 'Indicates if there is a previous page available.',
    },
    hasNextPage: {
      description: 'Indicates if there is a next page available.',
    },
    pages: {
      description: 'An array of available page numbers.',
    },
  },
};

export default Story;

export const Primary = (args) => (
  <Pagination
    {...args}
    setPageIndex={args.onPaginationChange}
    setPageSize={(size) => {
      args.onPaginationChange && args.onPaginationChange(0, size);
    }}
  />
);

Primary.args = {
  pageSizeOptions: [1, 2, 3, 4],
  pageIndex: 1,
  currentLimit: 4,
  hasPreviousPage: true,
  hasNextPage: true,
  pages: [0, 1, 2, 3],
};
