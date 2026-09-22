import * as Yup from "yup";

const passwordSchema = Yup.string()
  .required("La contraseña es requerida")
  .min(8, "Debe tener al menos 8 caracteres")
  .matches(/[a-z]/, "Debe incluir al menos una minúscula")
  .matches(/[A-Z]/, "Debe incluir al menos una mayúscula")
  .matches(/[0-9]/, "Debe incluir al menos un número")
  .matches(/[^A-Za-z0-9]/, "Debe incluir al menos un símbolo");

export const addUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre no debe exceder los 20 caracteres")
    .matches(/^[^$%&|<>#]*$/, "No se permiten caracteres especiales")
    .trim(),
  telephone: Yup.string()
    .required("El número de teléfono es requerido")
    .matches(/^\+?[0-9]{10,15}$/, "Ingresa un número de teléfono válido")
    .trim(),
  email: Yup.string()
    .required("El email es requerido")
    .email("El email no es válido")
    .trim(),
  employeeNumber: Yup.string()
    .required("El número de empleado es requerido")
    .trim(),
  password: passwordSchema,
});

export const updateUserSchema = addUserSchema.shape({
  password: Yup.string().test(
    "strong-if-present",
    "Debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y símbolo",
    (value) => !value || passwordSchema.isValidSync(value),
  ),
});
