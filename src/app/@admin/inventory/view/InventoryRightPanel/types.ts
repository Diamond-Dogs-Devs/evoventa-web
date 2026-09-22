import { InventoryI, InventoryProductI, ProductI } from "../../types/inventory.types";

export interface InventoryRightPanelProps {
  selectedInventory: InventoryI | null;
  inventoryProducts: InventoryProductI[];
  inventoryProductsLoading: boolean;
  productMutationLoading: boolean;
  allProducts: ProductI[];
  onOpenAddProduct: () => void;
  onDeleteProduct: (ip: InventoryProductI) => void;
}