import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('El email es requerido')
    .email('Debe ser un email válido')
    .trim(),

  password: Yup.string().required('La contraseña es requerida').trim(),
});
