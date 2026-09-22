"use client";

import React from "react";
import { Form, Formik, FieldArray, FormikValues } from "formik";
import { Button, Card, InputFormik, SelectFormik } from "@/shared/ui";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { addInventorySchema } from "../schemas/addInventory";
import { ADD_INVENTORY_FORM_INITIAL_VALUES } from "../utils/constants";
import { ProductI } from "../types/inventory.types";

interface Props {
  handleCreateInventory: (values: FormikValues) => void;
  close: () => void;
  allProducts: ProductI[];
}

export const AddInventoryModal = ({
  handleCreateInventory,
  close,
  allProducts,
}: Props) => {
  const productOptions = [
    { value: "", label: "Selecciona un producto" },
    ...allProducts.map((p) => ({
      value: String(p.id),
      label: `${p.name} — ${p.brand}`,
    })),
  ];

  return (
    <Formik
      initialValues={ADD_INVENTORY_FORM_INITIAL_VALUES}
      validationSchema={addInventorySchema}
      onSubmit={(values) => {
        handleCreateInventory(values);
        close();
      }}
    >
      {({ values }) => (
        <Form>
          <Card title="Crear nuevo inventario">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <InputFormik
                  label="Nombre del inventario"
                  name="name"
                  type="text"
                />
                <InputFormik label="Código" name="code" type="text" />
              </div>
              <InputFormik label="Descripción" name="description" type="text" />

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Productos iniciales
                </p>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <div className="flex flex-col gap-3">
                      {values.items.map((_: unknown, index: number) => (
                        <div key={index} className="flex items-end gap-2">
                          <div className="flex-1">
                            <SelectFormik
                              label="Producto"
                              name={`items[${index}].id`}
                              options={productOptions}
                            />
                          </div>
                          <div className="w-28">
                            <InputFormik
                              label="Cantidad"
                              name={`items[${index}].quantity`}
                              type="number"
                            />
                          </div>
                          {values.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="mb-1 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ id: "", quantity: 1 })}
                        className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-700 font-medium w-fit transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Agregar otro producto
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          </Card>

          <div className="flex justify-end mt-8">
            <Button type="submit" color="primary" variant="fill">
              Crear Inventario
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
