export const ROLE_OPTIONS = [
  { value: "USER", label: "Empleado" },
  { value: "ADMIN", label: "Administrador" },
];

export const ADD_USERS_FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  telephone: "",
  employeeNumber: "",
  password: "",
  role: "USER",
};

// Known API error messages (auth/register, users and class-validator) mapped
// to Spanish for the toast.
export const USER_API_ERRORS: Record<string, string> = {
  "User already exists": "Ya existe un usuario con ese email",
  "User with this email already exists": "Ya existe un usuario con ese email",
  "Employee number already exists": "Ese número de empleado ya está registrado",
  "password is not strong enough":
    "La contraseña debe tener mayúscula, minúscula, número y símbolo",
  "telephone must be a phone number": "El número de teléfono no es válido",
  "email must be an email": "El email no es válido",
  "Forbidden resource": "Solo un administrador puede crear usuarios",
};
