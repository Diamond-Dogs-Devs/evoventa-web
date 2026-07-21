import type { CellContext } from "@tanstack/react-table";

interface RowData {
  sku: string;
  commune: string;
  address: string;
  depa: string;
  bedrooms: number;
  bathrooms: number;
  price: string;
  state: string;
}

const cols = [
  {
    header: "SKU",
    accessorKey: "sku",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
  {
    header: "Comuna",
    accessorKey: "commune",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
  {
    header: "Dirección",
    accessorKey: "address",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
  {
    header: "Departamento",
    accessorKey: "depa",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
  {
    header: "Dormitorios",
    accessorKey: "bedrooms",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
  {
    header: "Baños",
    accessorKey: "bathrooms",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
  {
    header: "Precio",
    accessorKey: "price",
    cell: (row: CellContext<RowData, unknown>) => row.getValue(),
  },
];
