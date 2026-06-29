import type { Meta } from '@storybook/react';
import { default as Table } from './table';

const data = [
  {
    sku: 'SKU001',
    commune: 'Comuna A',
    address: '123 Main St',
    depa: 'Apartment 101',
    bedrooms: 2,
    bathrooms: 2,
    price: '$250,000',
    state: 'available',
  },
  {
    sku: 'SKU002',
    commune: 'Comuna B',
    address: '456 Elm St',
    depa: 'Apartment 202',
    bedrooms: 3,
    bathrooms: 2.5,
    price: '$320,000',
    state: 'sold',
  },
];

const cols = [
  {
    header: 'SKU',
    cell: (row) => row.renderValue(),
    accessorKey: 'sku',
  },
  {
    header: 'Comuna',
    cell: (row) => row.renderValue(),
    accessorKey: 'commune',
  },
  {
    header: 'Dirección',
    cell: (row) => row.renderValue(),
    accessorKey: 'address',
  },
  {
    header: 'Departamento',
    cell: (row) => row.renderValue(),
    accessorKey: 'depa',
  },
  {
    header: 'Dormitorios',
    cell: (row) => row.renderValue(),
    accessorKey: 'bedrooms',
  },
  {
    header: 'Baños',
    cell: (row) => row.renderValue(),
    accessorKey: 'bathrooms',
  },
  {
    header: 'Precio',
    cell: (row) => row.renderValue(),
    accessorKey: 'price',
  },
];

const Story: Meta<typeof Table> = {
  component: Table,
  title: 'Table',
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Data to be displayed in the table.',
    },
    columns: {
      description:
        'An array of column definitions to configure the table columns.',
    },
    showHeader: {
      description: 'Specifies whether to show the table header.',
    },
    columnVisibility: {
      description: 'A dictionary to control the visibility of columns.',
    },
    loading: {
      description: 'Indicates whether the table is in a loading state.',
    },
    withPagination: {
      description: 'Enables or disables pagination for the table.',
    },
    currentPage: {
      description: 'The current page in the table when pagination is enabled.',
    },
    currentLimit: {
      description:
        'The number of items to display per page when pagination is enabled.',
    },
    totalPages: {
      description: 'The total number of pages when pagination is enabled.',
    },
    onPaginationChange: {
      description: 'A function to handle changes in pagination.',
    },
    path: {
      description: 'A path used for internal navigation or URL generation.',
    },
  },
};
export default Story;

export const Primary = {
  args: {
    data: data,
    columns: cols,
    showHeader: true,
    columnVisibility: {},
    loading: false,
    withPagination: false,
    currentPage: 0,
    currentLimit: 15,
    totalPages: 4,
    onPaginationChange: () => null,
    path: '',
  },
};
