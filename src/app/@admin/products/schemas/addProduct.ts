import * as Yup from 'yup';

export const addProductSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre no debe exceder los 20 caracteres')
    .matches(/^[^$%&|<>#]*$/, 'No se permiten caracteres especiales')
    .trim(),
  salePrice: Yup.number()
    .typeError('El precio debe ser un número')
    .positive('El precio debe ser un número positivo')
    .required('El precio es requerido'),
  purchasePrice: Yup.number()
    .typeError('El precio de compra debe ser un número')
    .min(0, 'El precio de compra no puede ser negativo')
    .required('El precio de compra es requerido'),
  barcode: Yup.string()
    .required('El código de barras es requerido'),
  brand: Yup.string()
    .required('La marca es requerida')
    .min(3, 'La marca debe tener al menos 3 caracteres')
    .max(20, 'La marca no debe exceder los 20 caracteres'),
  category: Yup.string()
    .required('La categoría es requerida')
    .min(3, 'La categoría debe tener al menos 3 caracteres')
    .max(20, 'La categoría no debe exceder los 20 caracteres'),
  status: Yup.string()
    .required('El estado es requerido')
    .oneOf(
      ['AVAILABLE', 'UNAVAILABLE'],
      'El estado debe ser disponible o no disponible'
    ),
});
