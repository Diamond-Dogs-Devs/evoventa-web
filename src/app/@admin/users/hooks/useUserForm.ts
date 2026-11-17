import { FormikValues } from "formik";
import { addUserSchema, updateUserSchema } from "../schemas/addUser";
import { UserFormProps } from "../types/user.types";
import { USER_FORM_COPY } from "../utils/constants";

export const useUserForm = ({
  mode,
  initialValues,
  onSubmit,
  close,
}: Pick<UserFormProps, "mode" | "initialValues" | "onSubmit" | "close">) => {
  const isCreate = mode === "create";
  const copy = USER_FORM_COPY[mode];
  const validationSchema = isCreate ? addUserSchema : updateUserSchema;
  const subtitle =
    !isCreate && initialValues?.name ? initialValues.name : copy.subtitle;

  const handleSubmit = async (values: FormikValues) => {
    if (!isCreate) {
      onSubmit(values);
      close();
      return;
    }
    try {
      await onSubmit(values);
      close();
    } catch {
      
    }
  };

  return { isCreate, copy, subtitle, validationSchema, handleSubmit };
};
