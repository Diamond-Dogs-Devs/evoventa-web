"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormikValues } from "formik";

import { QrCodeIcon } from "@heroicons/react/24/outline";

import { Layout, Button } from "@/shared/ui";
import { useModal } from "@/shared/providers";
import { Pagination } from "@/shared/ui";

import { useProducts, useGlobalBarcodeScan } from "./hooks";
import { ADD_PRODUCT_FORM_INITIAL_VALUES } from "./utils/constants";

import {
  AddProductModal,
  DeleteProductModal,
  UpdateProductModal,
  ProductCard,
  ProductGrid,
} from "./components";

import { ProductI } from "./types/product.types";

const appConfig = {
  title: "Productos",
  currentPath: "/products",
};

export default function ProductsPage() {
  const router = useRouter();
  const { open, close } = useModal();

  const {
    products,
    loading,
    currentPage,
    totalPages,
    pageSize,
    onPaginationChange,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    mutationLoading,
    barcodeSearch,
    setBarcodeSearch,
    barcodeProduct,
    barcodeLoading,
  } = useProducts();

  const handleOpenCreateModal = (initialValues: FormikValues | null) => {
    open(
      <AddProductModal
        handleCreateProduct={handleCreateProduct}
        close={close}
        initialValues={initialValues}
      />,
    );
  };

  const handleOpenUpdateModal = (values: FormikValues) => {
    open(
      <UpdateProductModal
        handleUpdateProduct={handleUpdateProduct}
        close={close}
        values={values}
      />,
    );
  };

  const handleOpenDeleteModal = (values: ProductI) => {
    open(
      <DeleteProductModal
        handleDeleteProduct={handleDeleteProduct}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false },
    );
  };

  useEffect(() => {
    if (!barcodeSearch || barcodeLoading) return;

    if (barcodeProduct) {
      handleOpenUpdateModal(barcodeProduct);
    } else {
      handleOpenCreateModal({
        ...ADD_PRODUCT_FORM_INITIAL_VALUES,
        barcode: barcodeSearch,
      });
    }

    setBarcodeSearch(null);
  }, [barcodeSearch, barcodeLoading, barcodeProduct]);

  useGlobalBarcodeScan(setBarcodeSearch);

  return (
    <Layout appConfig={appConfig}>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <QrCodeIcon className="h-5 w-5 shrink-0" />
            <span>
              {barcodeLoading
                ? "Buscando producto..."
                : "Escanea un código de barras para buscar o crear"}
            </span>
          </div>

          <Button
            type="button"
            variant="border"
            color="primary"
            size="md"
            disabled={loading || mutationLoading}
            onClick={() => handleOpenCreateModal(null)}
          >
            Agregar Producto
          </Button>
        </div>

        <ProductGrid
          items={products}
          loading={loading}
          pageSize={pageSize}
          emptyTitle="No hay productos agregados"
          emptySubtitle="Agrega tu primer producto o escanea un código de barras"
          renderItem={(product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleOpenUpdateModal}
              onDelete={handleOpenDeleteModal}
              onClick={(item) => router.push(`/products/${item.id}`)}
            />
          )}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={(page) => onPaginationChange(page, pageSize)}
          onPageSizeChange={(size) => onPaginationChange(1, size)}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>
    </Layout>
  );
}
