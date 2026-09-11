"use client";

import { useState, useEffect } from "react";
import { Layout, Button, Heading } from "@/shared/ui";
import { useModal } from "@/shared/providers";
import { PlusCircleIcon, QrCodeIcon } from "@heroicons/react/24/outline";

import { useInventory, useGlobalBarcodeScan } from "./hooks";
import {
  AddInventoryModal,
  AddProductToInventoryModal,
  DeleteInventoryModal,
  DeleteInventoryProductModal,
  EditInventoryProductModal,
  InventoryList,
  InventoryRightPanel,
  ProductNotFoundModal,
} from "./components";
import { InventoryI, InventoryProductI } from "./types/inventory.types";

const appConfig = {
  title: "Inventario",
  currentPath: "/inventory",
};

export default function InventoryPage() {
  const { open, close } = useModal();
  const [selectedInventory, setSelectedInventory] =
    useState<InventoryI | null>(null);

  const {
    inventories,
    inventoryProducts,
    allProducts,
    inventoriesLoading,
    inventoryProductsLoading,
    inventoryMutationLoading,
    productMutationLoading,
    handleCreateInventory,
    handleAddProductToInventory,
    handleEditInventoryProduct,
    handleDeleteInventory,
    handleDeleteInventoryProduct,
    barcodeSearch,
    setBarcodeSearch,
    barcodeProduct,
    barcodeLoading,
  } = useInventory(selectedInventory?.id);

  useGlobalBarcodeScan((barcode) => setBarcodeSearch(barcode));

  useEffect(() => {
    if (!barcodeSearch || barcodeLoading) return;

    if (!barcodeProduct) {
      open(<ProductNotFoundModal term={barcodeSearch} close={close} />, {
        title: "Producto no encontrado",
        size: "xsmall",
        fullHeight: false,
      });
      setBarcodeSearch(null);
      return;
    }

    const existingItem = inventoryProducts.find(
      (ip) => ip.productId === barcodeProduct.id,
    );

    if (existingItem) {
      open(
        <EditInventoryProductModal
          inventoryProduct={existingItem}
          handleEditInventoryProduct={handleEditInventoryProduct}
          close={close}
        />,
        { title: "Editar producto", size: "xsmall", fullHeight: false },
      );
    } else {
      open(
        <AddProductToInventoryModal
          handleAddProductToInventory={handleAddProductToInventory}
          close={close}
          allProducts={allProducts}
          inventoryName={selectedInventory?.name ?? ""}
          initialProductId={String(barcodeProduct.id)}
        />,
        { size: "medium", fullHeight: false },
      );
    }

    setBarcodeSearch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeProduct, barcodeLoading, barcodeSearch]);

  const handleOpenCreateInventory = () => {
    open(
      <AddInventoryModal
        handleCreateInventory={handleCreateInventory}
        close={close}
        allProducts={allProducts}
      />,
      { size: "medium", fullHeight: false },
    );
  };

  const handleOpenAddProduct = () => {
    if (!selectedInventory) return;
    open(
      <AddProductToInventoryModal
        handleAddProductToInventory={handleAddProductToInventory}
        close={close}
        allProducts={allProducts}
        inventoryName={selectedInventory.name}
      />,
      { size: "medium", fullHeight: false },
    );
  };

  const handleOpenDeleteModal = (values: InventoryI) => {
    open(
      <DeleteInventoryModal
        handleDeleteInventory={handleDeleteInventory}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false },
    );
  };

  const handleOpenDeleteProductModal = (values: InventoryProductI) => {
    open(
      <DeleteInventoryProductModal
        handleDeleteInventoryProduct={handleDeleteInventoryProduct}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false },
    );
  };

  const inventoryProductsFormatted: InventoryProductI[] = Array.isArray(
    inventoryProducts,
  )
    ? inventoryProducts
    : [];

  return (
    <Layout appConfig={appConfig}>
      <div className="flex flex-col gap-4 lg:hidden pt-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-2 pb-1">
              <InventoryList
                mobile
                inventoriesLoading={inventoriesLoading}
                inventories={inventories}
                selectedInventory={selectedInventory}
                inventoryMutationLoading={inventoryMutationLoading}
                onSelectInventory={setSelectedInventory}
                onOpenCreateInventory={handleOpenCreateInventory}
                onOpenDeleteInventory={handleOpenDeleteModal}
              />
            </div>
          </div>
          <Button
            type="button"
            variant="fill"
            color="primary"
            onClick={handleOpenCreateInventory}
            disabled={inventoryMutationLoading}
            className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border border-dashed hover:bg-primary-50 disabled:opacity-50 transition-colors"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Nuevo
          </Button>
        </div>
        <InventoryRightPanel
          selectedInventory={selectedInventory}
          inventoryProducts={inventoryProductsFormatted}
          inventoryProductsLoading={inventoryProductsLoading}
          productMutationLoading={productMutationLoading}
          allProducts={allProducts}
          onOpenAddProduct={handleOpenAddProduct}
          onDeleteProduct={handleOpenDeleteProductModal}
        />
      </div>

      <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 mb-2">
        <QrCodeIcon className="h-5 w-5 shrink-0" />
        <span>
          {barcodeLoading
            ? "Buscando producto..."
            : "Escanea un código de barras para buscar un producto"}
        </span>
      </div>

      <div
        className="hidden lg:flex gap-4"
        style={{ minHeight: "calc(100vh - 10rem)" }}
      >
        <div className="w-72 shrink-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Heading variant="sectionHeadingCard">Inventarios</Heading>
            <Button
              type="button"
              variant="fill"
              color="primary"
              onClick={handleOpenCreateInventory}
              disabled={inventoryMutationLoading}
              className="flex items-center gap-1 text-sm font-medium disabled:opacity-50 transition-colors"
            >
              <PlusCircleIcon className="h-5 w-5" />
              Nuevo
            </Button>
          </div>
          <InventoryList
            inventoriesLoading={inventoriesLoading}
            inventories={inventories}
            selectedInventory={selectedInventory}
            inventoryMutationLoading={inventoryMutationLoading}
            onSelectInventory={setSelectedInventory}
            onOpenCreateInventory={handleOpenCreateInventory}
            onOpenDeleteInventory={handleOpenDeleteModal}
          />
        </div>

        <div className="w-px bg-gray-200 shrink-0" />

        <div className="flex-1 min-w-0 overflow-y-auto">
          <InventoryRightPanel
            selectedInventory={selectedInventory}
            inventoryProducts={inventoryProductsFormatted}
            inventoryProductsLoading={inventoryProductsLoading}
            productMutationLoading={productMutationLoading}
            allProducts={allProducts}
            onOpenAddProduct={handleOpenAddProduct}
            onDeleteProduct={handleOpenDeleteProductModal}
          />
        </div>
      </div>
    </Layout>
  );
}
