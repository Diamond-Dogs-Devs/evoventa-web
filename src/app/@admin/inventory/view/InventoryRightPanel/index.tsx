import { useRouter } from "next/navigation";
import { Button, Heading } from "@/shared/ui";
import {
  CubeIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { InventoryRightPanelProps } from "./types";
import { InventoryProductCard } from "../../components";
import { useInventaryActions } from "./hooks/useInventaryActions";

export function InventoryRightPanel({
  selectedInventory,
  inventoryProducts,
  inventoryProductsLoading,
  productMutationLoading,
}: InventoryRightPanelProps) {
  const router = useRouter();
  const { handleOpenAddProduct, handleOpenDeleteProductModal, allProducts } =
    useInventaryActions(selectedInventory);

  if (!selectedInventory) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400 py-20">
        <CubeIcon className="h-16 w-16" />
        <p className="text-base text-center">
          Selecciona un inventario para ver los productos
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <Heading variant="sectionHeadingCard">
            {selectedInventory.name}
          </Heading>
          {selectedInventory.description && (
            <p className="text-sm text-gray-500 mt-0.5">
              {selectedInventory.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="border"
            size="md"
            color="secondary"
            className="gap-2"
            onClick={() =>
              router.push(
                `/inventory/sales?inventoryId=${selectedInventory.id}`
              )
            }
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Nueva Venta
          </Button>
          <Button
            type="button"
            variant="border"
            size="md"
            color="primary"
            onClick={handleOpenAddProduct}
            disabled={productMutationLoading || allProducts.length === 0}
          >
            + Agregar producto
          </Button>
        </div>
      </div>

      {inventoryProductsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
            >
              <div className="flex justify-center py-2">
                <div className="w-32 h-32 rounded-xl bg-gray-200" />
              </div>
              <div className="h-4 bg-gray-200 rounded mt-3" />
              <div className="h-3 bg-gray-100 rounded mt-2 w-2/3" />
              <div className="h-3 bg-gray-100 rounded mt-1 w-1/2" />
              <div className="h-8 bg-gray-200 rounded mt-4" />
            </div>
          ))}
        </div>
      ) : inventoryProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 mt-16 text-gray-400">
          <MagnifyingGlassIcon className="h-12 w-12" />
          <p className="text-sm text-center">
            Este inventario no tiene productos aún.
            <br />
            Agrega el primero.
          </p>
          <Button
            type="button"
            variant="border"
            size="md"
            color="primary"
            onClick={handleOpenAddProduct}
            disabled={allProducts.length === 0}
          >
            + Agregar producto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {inventoryProducts.map((ip) => (
            <InventoryProductCard
              key={ip.id}
              inventoryProduct={ip}
              onDelete={handleOpenDeleteProductModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
