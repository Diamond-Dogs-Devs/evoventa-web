import { Button } from "@/shared/ui";
import { ArchiveBoxIcon, TrashIcon } from "@heroicons/react/24/outline";

import { InventoryI } from "../types/inventory.types";

interface InventoryListProps {
  mobile?: boolean;
  inventoriesLoading: boolean;
  inventories: InventoryI[];
  selectedInventory: InventoryI | null;
  inventoryMutationLoading: boolean;
  onSelectInventory: (inventory: InventoryI | null) => void;
  onOpenCreateInventory: () => void;
  onOpenDeleteInventory: (inventory: InventoryI) => void;
}

export function InventoryList({
  mobile = false,
  inventoriesLoading,
  inventories,
  selectedInventory,
  inventoryMutationLoading,
  onSelectInventory,
  onOpenCreateInventory,
  onOpenDeleteInventory,
}: InventoryListProps) {
  if (inventoriesLoading) {
    return (
      <div className={`flex ${mobile ? "flex-row gap-2" : "flex-col gap-2"}`}>
        {Array.from({ length: mobile ? 3 : 4 }).map((_, i) => (
          <div
            key={i}
            className={`bg-gray-100 animate-pulse rounded-xl ${
              mobile ? "h-9 w-28 shrink-0" : "h-16"
            }`}
          />
        ))}
      </div>
    );
  }

  if (inventories.length === 0) {
    return mobile ? (
      <p className="text-sm text-gray-400 px-1 py-2">Sin inventarios</p>
    ) : (
      <div className="flex flex-col items-center justify-center gap-3 mt-10 text-gray-400">
        <ArchiveBoxIcon className="h-12 w-12" />
        <p className="text-sm text-center">
          No hay inventarios.
          <br />
          Crea el primero.
        </p>
        <Button
          type="button"
          variant="border"
          size="md"
          color="primary"
          onClick={onOpenCreateInventory}
          disabled={inventoryMutationLoading}
        >
          Crear inventario
        </Button>
      </div>
    );
  }

  if (mobile) {
    return (
      <>
        {inventories.map((inv) => {
          const isSelected = selectedInventory?.id === inv.id;
          return (
            <button
              key={inv.id}
              onClick={() => onSelectInventory(isSelected ? null : inv)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isSelected
                  ? "bg-background-secondary border-background-secondary text-title-light shadow"
                  : "bg-background-primary border-gray-200 text-gray-600 hover:border-primary-300"
              }`}
            >
              <ArchiveBoxIcon className="h-4 w-4 shrink-0" />
              <span className="max-w-[120px] truncate">{inv.name}</span>
              {isSelected && (
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectInventory(null);
                    onOpenDeleteInventory(inv);
                  }}
                  className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </span>
              )}
            </button>
          );
        })}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-1">
      {inventories.map((inv) => {
        const isSelected = selectedInventory?.id === inv.id;
        return (
          <div
            key={inv.id}
            className={`w-full rounded-xl px-4 py-3 border transition-all shadow-sm ${
              isSelected
                ? "bg-background-secondary border-background-secondary text-title-light shadow-md"
                : "bg-background-primary border-gray-200 hover:border-primary-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 flex-1 min-w-0 text-left"
                onClick={() => onSelectInventory(inv)}
              >
                <ArchiveBoxIcon
                  className={`h-5 w-5 shrink-0 ${isSelected ? "text-white" : "text-primary-400"}`}
                />
                <div className="min-w-0">
                  <p
                    className={`font-semibold text-sm truncate ${isSelected ? "text-white" : "text-gray-800"}`}
                  >
                    {inv.name}
                  </p>
                  {inv.description && (
                    <p
                      className={`text-xs truncate mt-0.5 ${isSelected ? "text-primary-100" : "text-gray-400"}`}
                    >
                      {inv.description}
                    </p>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSelected) onSelectInventory(null);
                  onOpenDeleteInventory(inv);
                }}
                disabled={inventoryMutationLoading}
                className={`shrink-0 p-1 rounded-md transition-colors disabled:opacity-50 ${
                  isSelected
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
            <button
              className="w-full text-left"
              onClick={() => onSelectInventory(inv)}
            >
              <span
                className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                  inv.status === "ACTIVE" || inv.status === "AVAILABLE"
                    ? isSelected
                      ? "bg-white/20 text-white"
                      : "bg-green-100 text-green-600"
                    : isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {inv.status}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
