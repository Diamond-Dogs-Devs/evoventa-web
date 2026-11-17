import { ClientFormProps } from "../components/interfaces";
import { ClientFormValues } from "../types/client.types";
import { CLIENT_FORM_COPY } from "../utils/constants";

export const useClientForm = ({
  mode,
  onSubmit,
  close,
}: Pick<ClientFormProps, "mode" | "onSubmit" | "close">) => {
  const copy = CLIENT_FORM_COPY[mode];

  const handleSubmit = async (values: ClientFormValues) => {
    try {
      await onSubmit(values);
      close();
    } catch {
      // Keep the form open so the user can fix it and retry.
    }
  };

  return {
    copy,
    handleSubmit,
  };
};
