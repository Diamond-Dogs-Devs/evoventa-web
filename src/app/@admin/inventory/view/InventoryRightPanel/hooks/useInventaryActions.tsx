import { useModal } from "@/shared/providers";
import {
  AddProductToInventoryModal,
  DeleteInventoryProductModal,
} from "../../../components";
import { InventoryI, InventoryProductI } from "../../../types/inventory.types";
import { useInventory } from "../../../hooks";

export const useInventaryActions = (selectedInventory?: InventoryI | null) => {
  const { open, close } = useModal();
  const {
    allProducts,
    handleAddProductToInventory,
    handleDeleteInventoryProduct,
  } = useInventory(selectedInventory?.id);
  const handleOpenAddProduct = () => {
    if (!selectedInventory) return;
    open(
      <AddProductToInventoryModal
        handleAddProductToInventory={handleAddProductToInventory}
        close={close}
        allProducts={allProducts}
        inventoryName={selectedInventory.name}
      />,
      { size: "medium", fullHeight: false }
    );
  };

  const handleOpenDeleteProductModal = (values: InventoryProductI) => {
    open(
      <DeleteInventoryProductModal
        handleDeleteInventoryProduct={handleDeleteInventoryProduct}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false }
    );
  };

  return {
    handleOpenAddProduct,
    handleOpenDeleteProductModal,
    allProducts,
  };
};
