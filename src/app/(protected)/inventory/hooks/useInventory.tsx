import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { FormikValues } from "formik";
import { useCustomSWR, fetcher, useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { usePagination } from "@/shared/utils";
import { InventoryI, ProductI, InventoryProductI } from "../types/inventory.types";

export const useInventory = (selectedInventoryId?: number) => {
  const { open } = useToast();
  const { currentPage, pageSize, onPaginationChange } = usePagination();
  const [barcodeSearch, setBarcodeSearch] = useState<string | null>(null);

  const inventoriesKey = `/inventory`;

  const { data: inventoriesData, loading: inventoriesLoading } =
    useCustomSWR<{ data: InventoryI[] }>(inventoriesKey, fetcher, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: () => {
        open({
          type: "error",
          content: (
            <ToastContent
              title="Error"
              subtitle="Ha ocurrido un error cargando los inventarios"
            />
          ),
        });
      },
    });

  const inventoryProductsKey = selectedInventoryId
    ? `/inventory/${selectedInventoryId}`
    : null;

  type InventoryDetailResponse = {
    InventoryItem?: InventoryProductI[];
    data?: InventoryProductI[] & { InventoryItem?: InventoryProductI[] };
    name?: string;
    description?: string;
  };

  const { data: inventoryProductsData, loading: inventoryProductsLoading } =
    useCustomSWR<InventoryDetailResponse>(inventoryProductsKey, fetcher, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onError: () => {
        open({
          type: "error",
          content: (
            <ToastContent
              title="Error"
              subtitle="Ha ocurrido un error cargando los productos del inventario"
            />
          ),
        });
      },
    });

  const { data: allProductsData } = useCustomSWR<{ data: ProductI[] }>(
    "/products?limit=100",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const barcodeKey = barcodeSearch
    ? `/products?search=${barcodeSearch}`
    : null;
  const { data: barcodeData, loading: barcodeLoading } = useCustomSWR<{
    data: ProductI[];
  }>(barcodeKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const barcodeProduct: ProductI | null = useMemo(
    () => barcodeData?.data?.[0] ?? null,
    [barcodeData],
  );

  const {
    post: postInventory,
    delete: deleteInventory,
    loading: inventoryMutationLoading,
  } = useCustomMutation({
    url: "/inventory",
    mutateKey: inventoriesKey,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo crear el inventario"
          />
        ),
      });
    },
    onSuccess: () => {
      open({
        type: "success",
        content: (
          <ToastContent
            title="Éxito"
            subtitle="Inventario creado correctamente"
          />
        ),
      });
    },
  });

  const {
    patch: patchProductToInventory,
    delete: deleteInventoryProduct,
    loading: productMutationLoading,
  } = useCustomMutation({
    url: inventoryProductsKey ?? "/inventory",
    mutateKey: inventoryProductsKey ?? inventoriesKey,
    onError: () => {
      open({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo agregar el producto al inventario"
          />
        ),
      });
    },
    onSuccess: () => {
      open({
        type: "success",
        content: (
          <ToastContent
            title="Éxito"
            subtitle="Producto agregado al inventario"
          />
        ),
      });
    },
  });

  const inventoryCols = useMemo<ColumnDef<InventoryI>[]>(
    () => [
      { header: "Nombre", accessorKey: "name" },
      { header: "Descripción", accessorKey: "description" },
      { header: "Status", accessorKey: "status" },
    ],
    [],
  );

  const productMap = useMemo<Record<string, ProductI>>(() => {
    const products: ProductI[] = allProductsData?.data ?? [];
    return Object.fromEntries(products.map((p) => [String(p.id), p]));
  }, [allProductsData]);

  const inventoryProductCols = useMemo<ColumnDef<InventoryProductI>[]>(
    () => [
      {
        header: "Producto",
        accessorKey: "productId",
        cell: ({ getValue }) =>
          productMap[String(getValue())]?.name ?? String(getValue()),
      },
      {
        header: "Marca",
        accessorKey: "productId",
        id: "brand",
        cell: ({ getValue }) => productMap[String(getValue())]?.brand ?? "—",
      },
      {
        header: "Precio",
        accessorKey: "productId",
        id: "price",
        cell: ({ getValue }) => {
          const price = productMap[String(getValue())]?.price;
          return price != null
            ? `$${Number(price).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`
            : "—";
        },
      },
      {
        header: "Cantidad",
        accessorKey: "quantity",
      },
    ],
    [productMap],
  );

  const handleCreateInventory = (values: FormikValues) => {
    postInventory({
      name: values.name,
      code: values.code,
      description: values.description,
      items: values.items.map((item: { id: string; quantity: number }) => ({
        productId: item.id,
        quantity: Number(item.quantity),
      })),
    });
  };

  const handleAddProductToInventory = (values: FormikValues) => {
    if (!inventoryProductsKey) return;

    const existingItems = (
      inventoryProductsData?.InventoryItem ??
      inventoryProductsData?.data?.InventoryItem ??
      []
    ).map((item: InventoryProductI) => ({
      productId: String(item.productId),
      quantity: item.quantity,
    }));

    const newItems = values.items.map(
      (item: { productId: string; quantity: number }) => ({
        productId: String(item.productId),
        quantity: Number(item.quantity),
      }),
    );

    patchProductToInventory(inventoryProductsKey, {
      name: inventoryProductsData?.name,
      description: inventoryProductsData?.description,
      items: [...existingItems, ...newItems],
    });
  };

  const handleDeleteInventory = (id: number) => {
    deleteInventory(`/inventory/${id}`);
  };

  const handleEditInventoryProduct = (itemId: number, quantity: number) => {
    if (!inventoryProductsKey) return;

    const updatedItems = rawInventoryProducts.map((item) => ({
      productId: String(item.productId),
      quantity: item.id === itemId ? quantity : item.quantity,
    }));
    patchProductToInventory(inventoryProductsKey, {
      name: inventoryProductsData?.name,
      description: inventoryProductsData?.description,
      items: updatedItems,
    });
  };

  const handleDeleteInventoryProduct = (itemId: number) => {
    deleteInventoryProduct(
      `/inventory/${selectedInventoryId}/products/${itemId}`,
    );
  };

  const inventories: InventoryI[] = inventoriesData?.data ?? [];

  const rawInventoryProducts: InventoryProductI[] =
    inventoryProductsData?.InventoryItem ??
    inventoryProductsData?.data?.InventoryItem ??
    inventoryProductsData?.data ??
    [];

  const inventoryProducts: InventoryProductI[] = useMemo(
    () =>
      rawInventoryProducts.map((item) => ({
        ...item,
        product: productMap[String(item.productId)] ?? item.product,
      })),
    [rawInventoryProducts, productMap],
  );

  const allProducts: ProductI[] = allProductsData?.data ?? [];

  return {
    inventories,
    inventoryProducts,
    allProducts,
    inventoriesLoading,
    inventoryProductsLoading,
    inventoryMutationLoading,
    productMutationLoading,
    inventoryCols,
    inventoryProductCols,
    currentPage,
    pageSize,
    onPaginationChange,
    handleCreateInventory,
    handleAddProductToInventory,
    handleEditInventoryProduct,
    handleDeleteInventory,
    handleDeleteInventoryProduct,
    barcodeSearch,
    setBarcodeSearch,
    barcodeProduct,
    barcodeLoading,
  };
};
