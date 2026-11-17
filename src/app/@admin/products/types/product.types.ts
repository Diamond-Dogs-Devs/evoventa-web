import type { FormikValues } from "formik";

export interface ProductI {
  id: number;
  name: string;
  salePrice: number;
  purchasePrice: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  barcode: string;
  brand: string;
  category: string;
  status: string;
  imageUrl: string;
}

export type ProductFormMode = "create" | "edit";

export interface ProductFormProps {
  mode: ProductFormMode;
  initialValues?: FormikValues | null;
  onSubmit: (values: FormikValues) => void | Promise<void>;
  close: () => void;
}

export interface ProfitHintProps {
  sale: number;
  purchase: number;
}
