"use client";

import { InputFormik } from "@/shared/ui";
import { StockFieldsProps } from "../types/inventory.types";

export const StockFields = ({ prefix }: StockFieldsProps) => {
  const name = (field: string) => (prefix ? `${prefix}.${field}` : field);

  return (
    <div className="grid grid-cols-3 gap-2">
      <InputFormik label="Cantidad" name={name("quantity")} type="number" />
      <InputFormik label="Stock bajo" name={name("lowStock")} type="number" />
      <InputFormik
        label="Stock crítico"
        name={name("criticalStock")}
        type="number"
      />
    </div>
  );
};
