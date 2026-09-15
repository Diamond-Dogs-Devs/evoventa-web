"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useCustomSWR, fetcher, useCustomMutation } from "@/shared/api";
import { useToast } from "@/shared/overlay-manager";
import { ToastContent } from "@/shared/ui";
import { useModal } from "@/shared/providers";

import { useGlobalBarcodeScan } from "./useGlobalBarcodeScan";
import { ProductNotFoundModal } from "../components/ProductNotFoundModal";
import { ProductNotInInventoryModal } from "../components/ProductNotInInventoryModal";
import {
  InventoryI,
  ProductI,
  InventoryProductI,
  ClientI,
  CartItemI,
} from "../types/sales.types";

export const useSales = (
  initialInventoryId?: string | null,
  onOrderSuccess?: () => void,
) => {
  const { open: openToast } = useToast();
  const { open: openModal, close: closeModal } = useModal();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cartItems, setCartItems] = useState<CartItemI[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientI | null>(null);
  const [selectedInventory, setSelectedInventory] =
    useState<InventoryI | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const changeInventory = useCallback((inv: InventoryI) => {
    setSelectedInventory(inv);
    setCartItems([]);
    setSearch("");
    setDebouncedSearch("");
  }, []);

  const { data: inventoriesData, loading: inventoriesLoading } =
    useCustomSWR<{ data: InventoryI[] }>("/inventory", fetcher, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    });

  const inventories = useMemo<InventoryI[]>(
    () => inventoriesData?.data ?? [],
    [inventoriesData],
  );

  const activeInventory =
    selectedInventory ??
    inventories.find((inv) => String(inv.id) === initialInventoryId) ??
    inventories[0] ??
    null;

  const inventoryProductsKey = activeInventory
    ? `/inventory/${activeInventory.id}`
    : null;

  const searchKey = debouncedSearch
    ? `/products?search=${debouncedSearch}&limit=15`
    : null;

  const { data: searchData, loading: searchLoading } = useCustomSWR<{
    data: ProductI[];
  }>(searchKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const { data: inventoryProductsData, loading: inventoryProductsLoading } =
    useCustomSWR<{ InventoryItem: InventoryProductI[] }>(
      inventoryProductsKey,
      fetcher,
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError: () => {
          openToast({
            type: "error",
            content: (
              <ToastContent
                title="Error"
                subtitle="Error al cargar los productos del inventario"
              />
            ),
          });
        },
      },
    );

  const { data: allProductsData } = useCustomSWR<{ data: ProductI[] }>(
    "/products?limit=100",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const { data: clientsData } = useCustomSWR<{ data: ClientI[] }>(
    "/clients?page=1&limit=100",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const clients: ClientI[] = clientsData?.data ?? [];

  const { post, loading: orderLoading } = useCustomMutation({
    url: "/orders",
    mutateKey: "/orders",
    onError: () => {
      openToast({
        type: "error",
        content: (
          <ToastContent
            title="Error"
            subtitle="No se pudo registrar la venta"
          />
        ),
      });
    },
    onSuccess: () => {
      openToast({
        type: "success",
        content: (
          <ToastContent
            title="Éxito"
            subtitle="Venta registrada correctamente"
          />
        ),
      });
      setCartItems([]);
      setSelectedClient(null);
      onOrderSuccess?.();
    },
  });

  const productMap = useMemo<Record<string, ProductI>>(() => {
    const products: ProductI[] = allProductsData?.data ?? [];
    return Object.fromEntries(products.map((p) => [String(p.id), p]));
  }, [allProductsData]);

  const rawInventoryProducts: InventoryProductI[] = useMemo(() => {
    return inventoryProductsData?.InventoryItem ?? [];
  }, [inventoryProductsData]);

  const enrichedInventoryProducts: InventoryProductI[] = useMemo(
    () =>
      rawInventoryProducts.map((item) => ({
        ...item,
        product: productMap[String(item.productId)] ?? item.product,
      })),
    [rawInventoryProducts, productMap],
  );

  const inventoryProducts: InventoryProductI[] = useMemo(() => {
    if (!debouncedSearch) return enrichedInventoryProducts;
    const matchingIds = new Set((searchData?.data ?? []).map((p) => p.id));
    return enrichedInventoryProducts.filter((ip) =>
      matchingIds.has(ip.productId),
    );
  }, [enrichedInventoryProducts, debouncedSearch, searchData]);

  const addToCart = useCallback((ip: InventoryProductI) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.inventoryProduct.productId === ip.productId,
      );
      if (existing) {
        if (existing.quantity >= ip.quantity) return prev;
        return prev.map((item) =>
          item.inventoryProduct.productId === ip.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { inventoryProduct: ip, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.inventoryProduct.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.inventoryProduct.productId === productId
            ? { ...item, quantity }
            : item,
        ),
      );
    },
    [removeFromCart],
  );

  const cartQuantityMap = useMemo(
    () =>
      Object.fromEntries(
        cartItems.map((item) => [
          item.inventoryProduct.productId,
          item.quantity,
        ]),
      ),
    [cartItems],
  );

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + (item.inventoryProduct.product?.salePrice ?? 0) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const [barcodeSearch, setBarcodeSearch] = useState<string | null>(null);
  const barcodeKey = barcodeSearch
    ? `/products?search=${barcodeSearch}`
    : null;

  const { data: barcodeData, loading: barcodeLoading } = useCustomSWR<{
    data: ProductI[];
  }>(barcodeKey, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const barcodeProduct: ProductI | null = useMemo(() => {
    if (!barcodeSearch) return null;
    return (
      barcodeData?.data?.find((p) => p.barcode === barcodeSearch) ?? null
    );
  }, [barcodeData, barcodeSearch]);

  useEffect(() => {
    if (!barcodeSearch || barcodeLoading) return;

    if (!barcodeProduct) {
      openModal(
        <ProductNotFoundModal term={barcodeSearch} close={closeModal} />,
        { title: "Producto no encontrado", size: "xsmall", fullHeight: false },
      );
      // Consumes the one-shot barcode scan event; not synchronizing derived state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBarcodeSearch(null);
      return;
    }

    const inventoryItem = enrichedInventoryProducts.find(
      (ip) => ip.productId === barcodeProduct.id,
    );

    if (!inventoryItem) {
      if (activeInventory) {
        openModal(
          <ProductNotInInventoryModal
            product={barcodeProduct}
            inventory={activeInventory}
            close={closeModal}
          />,
          {
            title: "Producto no disponible",
            size: "xsmall",
            fullHeight: false,
          },
        );
      }
      setBarcodeSearch(null);
      return;
    }

    addToCart(inventoryItem);
    setBarcodeSearch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeProduct, barcodeLoading, barcodeSearch]);

  useGlobalBarcodeScan((barcode) => setBarcodeSearch(barcode));

  const handleCreateOrder = () => {
    if (!selectedClient || cartItems.length === 0) return;
    post({
      orderNumber: `ORD-${Date.now()}`,
      clientId: selectedClient.id,
      items: cartItems.map((item) => ({
        productId: item.inventoryProduct.productId,
        quantity: item.quantity,
        salePrice: item.inventoryProduct.product?.salePrice ?? 0,
      })),
    });
  };

  return {
    inventories,
    inventoriesLoading,
    activeInventory,
    changeInventory,
    inventoryProducts,
    inventoryProductsLoading: inventoryProductsLoading || searchLoading,
    search,
    setSearch,
    clients,
    selectedClient,
    setSelectedClient,
    cartItems,
    cartQuantityMap,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    barcodeLoading,
    orderLoading,
    handleCreateOrder,
  };
};
