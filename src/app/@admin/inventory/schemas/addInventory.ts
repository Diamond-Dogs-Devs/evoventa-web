import * as Yup from "yup";

export const addInventorySchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no debe exceder los 50 caracteres")
    .trim(),
  code: Yup.string().required("El código es requerido").trim(),
  description: Yup.string().trim(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string().required("Selecciona un producto"),
        quantity: Yup.number()
          .typeError("Debe ser un número")
          .positive("Debe ser mayor a 0")
          .integer("Debe ser entero")
          .required("Requerido"),
      }),
    )
    .min(1, "Agrega al menos un producto"),
});

export const addProductToInventorySchema = Yup.object().shape({
  items: Yup.array()
    .of(
      Yup.object().shape({
        productId: Yup.string().required("Selecciona un producto"),
        quantity: Yup.number()
          .typeError("Debe ser un número")
          .positive("Debe ser mayor a 0")
          .integer("Debe ser entero")
          .required("Requerido"),
      }),
    )
    .min(1, "Agrega al menos un producto"),
});
