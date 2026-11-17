import {
  PRODUCT_STATUSES,
  PRODUCT_STATUS_VALUES,
} from "@/shared/utils/productStatus";
import type { ProductFormMode } from "../types/product.types";

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

export const PRODUCT_FORM_COPY: Record<
  ProductFormMode,
  { title: string; subtitle: string; submit: string }
> = {
  create: {
    title: "Nuevo producto",
    subtitle: "Completa los datos para agregarlo al catálogo.",
    submit: "Crear producto",
  },
  edit: {
    title: "Editar producto",
    subtitle: "Actualiza los datos del producto.",
    submit: "Guardar cambios",
  },
};
