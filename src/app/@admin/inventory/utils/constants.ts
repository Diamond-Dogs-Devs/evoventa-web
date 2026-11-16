export const DEFAULT_LOW_STOCK = 5;
export const DEFAULT_CRITICAL_STOCK = 2;

export const EMPTY_INVENTORY_ITEM = {
  quantity: 1,
  lowStock: DEFAULT_LOW_STOCK,
  criticalStock: DEFAULT_CRITICAL_STOCK,
};

export const ADD_INVENTORY_FORM_INITIAL_VALUES = {
  name: "",
  code: "",
  description: "",
  items: [{ id: "", ...EMPTY_INVENTORY_ITEM }],
};

export const ADD_PRODUCT_TO_INVENTORY_INITIAL_VALUES = {
  items: [{ productId: "", ...EMPTY_INVENTORY_ITEM }],
};
