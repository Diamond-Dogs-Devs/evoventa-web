"use client";

import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { Button, Card, Heading, InputFormik, SelectFormik } from "@/shared/ui";
import { useModal } from "@/shared/providers";
import { CartItemI, ClientI } from "../types/sales.types";
import { StockExceededModal } from "./StockExceededModal";

interface CartPanelProps {
  cartItems: CartItemI[];
  clients: ClientI[];
  selectedClient: ClientI | null;
  onSelectClient: (client: ClientI | null) => void;
  total: number;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onConfirm: () => void;
  loading: boolean;
  onClose?: () => void;
}

export function CartPanel({
  cartItems,
  clients,
  selectedClient,
  onSelectClient,
  total,
  onRemove,
  onUpdateQuantity,
  onConfirm,
  loading,
  onClose,
}: CartPanelProps) {
  const { open: openModal, close: closeModal } = useModal();
  const canConfirm =
    cartItems.length > 0 && selectedClient !== null && !loading;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openStockModal = (available: number) => {
    openModal(<StockExceededModal available={available} close={closeModal} />, {
      title: "Stock insuficiente",
      size: "xsmall",
      fullHeight: false,
    });
  };

  return (
    <Card
      className="flex flex-col h-full overflow-hidden"
      childrenPadding="flex flex-col flex-1 min-h-0"
    >
      {onClose && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 lg:hidden">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
            <Heading variant="body" className="font-semibold !text-gray-800">
              Carrito
            </Heading>
            {totalItems > 0 && (
              <Heading
                variant="body"
                className="bg-blue-600 !text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems}
              </Heading>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}

      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <UserIcon className="h-4 w-4 text-gray-500" />
          <Heading
            variant="sectionHeadingCard"
            className="text-xs font-semibold uppercase tracking-wide"
          >
            Cliente
          </Heading>
        </div>
        <Formik
          initialValues={{
            clientId: selectedClient ? String(selectedClient.id) : "",
          }}
          enableReinitialize
          onSubmit={() => {}}
        >
          <Form>
            <SelectFormik
              name="clientId"
              options={[
                { value: "", label: "Seleccionar cliente..." },
                ...clients.map((c) => ({ value: String(c.id), label: c.name })),
              ]}
              onChange={(e) => {
                const id = e.target.value;
                onSelectClient(
                  id ? (clients.find((c) => c.id === id) ?? null) : null,
                );
              }}
            />
          </Form>
        </Formik>

        {!selectedClient && cartItems.length > 0 && (
          <Heading variant="body" className="text-xs !text-amber-600 mt-1">
            Selecciona un cliente para continuar
          </Heading>
        )}
      </div>

      <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
        <ShoppingCartIcon className="h-4 w-4 text-gray-500" />
        <Heading
          variant="body"
          className="text-xs font-semibold !text-gray-500 uppercase tracking-wide"
        >
          Resumen de venta
        </Heading>
        {totalItems > 0 && (
          <Heading
            variant="body"
            className="ml-auto bg-background-secondary !text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {totalItems}
          </Heading>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <ShoppingCartIcon className="h-12 w-12 text-gray-200 mb-3" />
            <Heading variant="body" className="text-sm !text-gray-400">
              Agrega productos para comenzar la venta
            </Heading>
          </div>
        ) : (
          cartItems.map(({ inventoryProduct: ip, quantity }) => {
            const product = ip.product;
            const productId = ip.productId;
            const availableStock = ip.quantity;

            return (
              <div
                key={productId}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0" title={product?.name}>
                    <Heading
                      variant="body"
                      className="text-sm font-semibold !text-gray-800 truncate"
                    >
                      {product?.name ?? `Producto #${productId}`}
                    </Heading>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(productId)}
                    className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <Heading variant="body" className="text-xs !text-gray-400 mt-0.5">
                  {product?.brand ?? "—"}
                </Heading>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(productId, quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <MinusIcon className="h-3 w-3 text-gray-600" />
                    </button>

                    <Formik
                      initialValues={{ qty: String(quantity) }}
                      enableReinitialize
                      onSubmit={(values) => {
                        const newQty = Math.max(
                          1,
                          Math.floor(Number(values.qty) || 1),
                        );
                        if (newQty > availableStock) {
                          openStockModal(availableStock);
                          return;
                        }
                        onUpdateQuantity(productId, newQty);
                      }}
                    >
                      {({ submitForm }) => (
                        <Form>
                          <div onBlur={() => submitForm()}>
                            <InputFormik
                              name="qty"
                              type="number"
                              min={1}
                              max={availableStock}
                              className="w-full text-center"
                            />
                          </div>
                        </Form>
                      )}
                    </Formik>

                    <button
                      type="button"
                      onClick={() => {
                        if (quantity + 1 > availableStock) {
                          openStockModal(availableStock);
                          return;
                        }
                        onUpdateQuantity(productId, quantity + 1);
                      }}
                      className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <PlusIcon className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>

                  <Heading variant="body" className="text-sm font-bold !text-gray-800">
                    ${((product?.salePrice ?? 0) * quantity).toFixed(2)}
                  </Heading>
                </div>

                <Heading
                  variant="body"
                  className="text-xs !text-gray-400 mt-1 text-right"
                >
                  ${(product?.salePrice ?? 0).toFixed(2)} c/u
                </Heading>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-gray-200 space-y-3 bg-gray-50">
        <div className="flex justify-between items-center">
          <Heading variant="body" className="font-bold !text-gray-800">
            Total
          </Heading>
          <Heading variant="body" className="text-2xl font-bold !text-gray-900">
            ${total.toFixed(2)}
          </Heading>
        </div>
        <Button
          type="button"
          variant="fill"
          color="primary"
          size="md"
          className="w-full justify-center"
          disabled={!canConfirm}
          loading={loading}
          onClick={onConfirm}
        >
          {loading ? "Procesando..." : "Realizar Venta"}
        </Button>
      </div>
    </Card>
  );
}
