"use client";

import { InputFormik } from "@/shared/ui";

interface Props {
  /** Formik path of the item, e.g. `items[0]`. Empty for top-level fields. */
  prefix?: string;
}

export const StockFields = ({ prefix }: Props) => {
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
