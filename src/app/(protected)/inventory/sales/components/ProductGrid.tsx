"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Formik, Form } from "formik";
import { Button, Heading, SelectFormik, InputFormik } from "@/shared/ui";
import { useSales } from "../hooks/useSales";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  inventories: ReturnType<typeof useSales>["inventories"];
  inventoriesLoading: boolean;
  activeInventory: ReturnType<typeof useSales>["activeInventory"];
  changeInventory: ReturnType<typeof useSales>["changeInventory"];
  inventoryProducts: ReturnType<typeof useSales>["inventoryProducts"];
  loading: boolean;
  search: string;
  setSearch: (v: string) => void;
  cartQuantityMap: ReturnType<typeof useSales>["cartQuantityMap"];
  addToCart: ReturnType<typeof useSales>["addToCart"];
}

export function ProductGrid({
  inventories,
  activeInventory,
  changeInventory,
  inventoryProducts,
  loading,
  search,
  setSearch,
  cartQuantityMap,
  addToCart,
}: ProductGridProps) {
  return (
    <Formik
      initialValues={{
        inventoryId: activeInventory ? String(activeInventory.id) : "",
        status: "",
        search: "",
      }}
      enableReinitialize
      onSubmit={(_v, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ values, setValues }) => {
        const filteredProducts = values.status
          ? inventoryProducts.filter(
              (ip) => ip.product?.status === values.status,
            )
          : inventoryProducts;

        return (
          <Form className="flex flex-col flex-1 min-w-0 overflow-hidden gap-3 pb-20 lg:pb-0">
            <div className="flex flex-col sm:flex-row gap-2">
              {inventories.length > 0 && (
                <div className="flex-shrink-0 w-48">
                  <SelectFormik
                    name="inventoryId"
                    options={inventories.map((inv) => ({
                      value: String(inv.id),
                      label: inv.name,
                    }))}
                    onChange={(e) => {
                      const inv = inventories.find(
                        (i) => String(i.id) === e.target.value,
                      );
                      if (inv) changeInventory(inv);
                    }}
                  />
                </div>
              )}

              <div className="flex-shrink-0 w-48">
                <SelectFormik
                  name="status"
                  options={[
                    { value: "", label: "Todos los productos" },
                    { value: "AVAILABLE", label: "Disponibles" },
                    { value: "UNAVAILABLE", label: "No disponibles" },
                  ]}
                />
              </div>

              <div className="flex-1">
                <InputFormik
                  name="search"
                  type="text"
                  label="Buscar por nombre, marca o código"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
                    >
                      <div className="flex justify-center py-2">
                        <div className="w-14 h-14 rounded-xl bg-gray-200" />
                      </div>
                      <div className="h-4 bg-gray-200 rounded mt-2" />
                      <div className="h-3 bg-gray-100 rounded mt-1 w-2/3" />
                      <div className="h-6 bg-gray-200 rounded mt-3" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mb-3" />
                  <Heading variant="body" className="!text-gray-500 font-medium">
                    {search || values.status
                      ? "No se encontraron productos"
                      : !activeInventory
                        ? "No hay inventarios disponibles"
                        : "Este inventario no tiene productos"}
                  </Heading>
                  {(search || values.status) && (
                    <Button
                      type="button"
                      variant="border"
                      color="primary"
                      onClick={() => {
                        setSearch("");
                        setValues({ ...values, status: "" });
                      }}
                      className="mt-2"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filteredProducts.map((ip) => (
                    <ProductCard
                      key={ip.id}
                      inventoryProduct={ip}
                      quantityInCart={cartQuantityMap[ip.productId] ?? 0}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
