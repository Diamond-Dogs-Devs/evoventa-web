export const ERROR_DETAIL_MISSING_FIELDS = {
  state: "Estado",
  scheduledDate: "Fecha agendamiento",
  uuid: "uuid",
  client: "Cliente",
  observation: "Observaciones",
  stateUpdated: "Fecha actualización",
  createdAt: "Fecha creación",
  updatedAt: "Fecha actualización",
  discount: "Descuento",
  sale: "Venta",
  expirationDate: "Fecha expiración",
  type: "Tipo",
  paymentReceiptUrl: "Comprobante de pago",
  paymentDate: "Fecha de pago",
  rejectedReason: "Razón de rechazo",
  active: "Activa",
  status: "Estatus",
  bill: "Factura",
  others: "Otros",
};

export const ERROR_DETAIL_CONDITIONS: {
  [key: string]: { message: string; extraData?: (details: unknown) => string };
} = {
  USER_ALREADY_EXISTS: {
    message: "Ya existe un usuario con los datos ingresados.",
  },
  INTERNAL_SERVER_ERROR: {
    message:
      "Ha ocurrido un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.",
  },
  GENERIC_ERROR: {
    message: "Algo salió mal. Por favor, intenta de nuevo más tarde.",
  },
  WRONG_DATA_ENTRY: {
    message:
      "Los datos que has ingresado son incorrectos. Por favor, revisa la información e inténtalo de nuevo.",
  },
};

export const CLOUDINARY_TYPES = {
  PRODUCTS: "products",
  USERS: "users",
} as const;
