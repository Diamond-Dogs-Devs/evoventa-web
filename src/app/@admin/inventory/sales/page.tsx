"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Heading, Layout } from "@/shared/ui";
import {
  ShoppingCartIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useSales } from "./hooks";
import { CartPanel, ProductGrid, CheckoutScreen } from "./components";
import Page from "@/shared/components/Page";

const appConfig = {
  title: "Nueva Venta",
  currentPath: "/inventory",
};

export default function SalesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialInventoryId = searchParams?.get("inventoryId") ?? null;
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState<"sale" | "checkout">("sale");

  const {
    inventories,
    inventoriesLoading,
    activeInventory,
    changeInventory,
    inventoryProducts,
    inventoryProductsLoading,
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
    orderLoading,
    handleCreateOrder,
  } = useSales(initialInventoryId, () => setStep("sale"));

  const loading = inventoriesLoading || inventoryProductsLoading;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (step === "checkout") {
    return (
      <Page title="Confirmar venta">
        <CheckoutScreen
          cartItems={cartItems}
          selectedClient={selectedClient}
          total={total}
          orderLoading={orderLoading}
          onConfirm={handleCreateOrder}
          onBack={() => setStep("sale")}
        />
      </Page>
    );
  }

  const cartPanelProps = {
    cartItems,
    clients,
    selectedClient,
    onSelectClient: setSelectedClient,
    total,
    onRemove: removeFromCart,
    onUpdateQuantity: updateQuantity,
    onConfirm: () => setStep("checkout"),
    loading: orderLoading,
  };

  const mobileCart = cartOpen && (
    <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setCartOpen(false)}
      />
      <div className="relative bg-white rounded-t-2xl flex flex-col max-h-[90vh]">
        <CartPanel {...cartPanelProps} onClose={() => setCartOpen(false)} />
      </div>
    </div>
  );

  const mobileCartButton = (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
      <Button
        type="button"
        variant="fill"
        color="primary"
        onClick={() => setCartOpen(true)}
        className="!rounded-xl !px-4 !py-3 w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <Heading
                variant="body"
                className="absolute -top-2 -right-2 bg-white !text-blue-600 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
              >
                {totalItems}
              </Heading>
            )}
          </div>
          <Heading
            variant="body"
            className="font-semibold text-sm !text-title-light"
          >
            {totalItems === 0
              ? "Carrito vacío"
              : `${totalItems} producto${totalItems !== 1 ? "s" : ""}`}
          </Heading>
        </div>
        <div className="flex items-center gap-2">
          <Heading
            variant="body"
            className="font-bold text-lg !text-title-light"
          >
            ${total.toFixed(2)}
          </Heading>
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </Button>
    </div>
  );

  return (
    <Page title={appConfig.title}>
      <div className="flex flex-col gap-3 h-[calc(100vh-6rem)]">
        <Button
          type="button"
          variant="link"
          color="lightGray"
          onClick={() => router.push("/inventory")}
          className="!no-underline flex items-center gap-2 !text-sm !text-gray-500 hover:!text-gray-700 w-fit"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a inventario
        </Button>

        <div className="flex-1 min-h-0 flex gap-4">
          <ProductGrid
            inventories={inventories}
            inventoriesLoading={inventoriesLoading}
            activeInventory={activeInventory}
            changeInventory={changeInventory}
            inventoryProducts={inventoryProducts}
            loading={loading}
            search={search}
            setSearch={setSearch}
            cartQuantityMap={cartQuantityMap}
            addToCart={addToCart}
          />
          <div className="hidden lg:block w-80 min-w-[300px] h-full">
            <CartPanel {...cartPanelProps} />
          </div>
          {mobileCartButton}
          {mobileCart}
        </div>
      </div>
    </Page>
  );
}
