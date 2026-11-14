import {
  PRODUCT_STATUSES,
  PRODUCT_STATUS_VALUES,
} from "@/shared/utils/productStatus";

export {
  PRODUCT_STATUSES,
  PRODUCT_STATUS_VALUES,
  type ProductStatusT,
} from "@/shared/utils/productStatus";

export const PRODUCT_STATUS_OPTIONS = [
  { value: "", label: "Selecciona un status" },
  ...PRODUCT_STATUS_VALUES.map((value) => ({
    value,
    label: PRODUCT_STATUSES[value].label,
  })),
];

export const ADD_PRODUCT_FORM_INITIAL_VALUES = {
  name: "",
  salePrice: 0,
  purchasePrice: 0,
  barcode: "",
  brand: "",
  category: "",
  status: "",
  image: null,
};
