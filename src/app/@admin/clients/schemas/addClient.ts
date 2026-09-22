import * as Yup from "yup";

export const addClientSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre no debe exceder los 20 caracteres")
    .matches(/^[^$%&|<>#]*$/, "No se permiten caracteres especiales")
    .trim(),
  phone: Yup.string().required("El número de teléfono es requerido").trim(),
  email: Yup.string()
    .required("El email es requerido")
    .email("El email no es válido")
    .trim(),
  address: Yup.string()
    .required("La dirección es requerida")
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(100, "La dirección no debe exceder los 100 caracteres")
    .trim(),
});
