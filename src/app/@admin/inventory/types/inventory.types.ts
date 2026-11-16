import type { FormikValues } from "formik";
export interface InventoryI {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductI {
  id: number;
  name: string;
  salePrice: number;
  brand: string;
  category: string;
  status: string;
  stock: number;
  barcode: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryProductI {
  id: number;
  inventoryId: number;
  productId: number;
  quantity: number;
  lowStock: number;
  criticalStock: number;
  product: ProductI;
  InventoryItem: Array<ProductI>;
}

export interface InventoryItemFormI {
  productId: string;
  quantity: number;
  lowStock: number;
  criticalStock: number;
}

export interface AddProductToInventoryModalProps {
  handleAddProductToInventory: (values: FormikValues) => void;
  close: () => void;
  allProducts: ProductI[];
  inventoryName: string;
  initialProductId?: string;
}

export interface DeleteInventoryProductModalProps {
  handleDeleteInventoryProduct: (itemId: number) => void;
  close: () => void;
  values: InventoryProductI;
}

export interface EditInventoryProductValues {
  quantity: number;
  lowStock: number;
  criticalStock: number;
}

export interface EditInventoryProductModalProps {
  inventoryProduct: InventoryProductI;
  handleEditInventoryProduct: (
    itemId: number,
    values: EditInventoryProductValues,
  ) => void;
  close: () => void;
}

export interface StockFieldsProps {
  prefix?: string;
}

export type ItemLike = {
  productId: string | number;
  quantity: number | string;
  lowStock?: number | string;
  criticalStock?: number | string;
};
