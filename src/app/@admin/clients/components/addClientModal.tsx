"use client";

import { ClientForm } from "./ClientForm";
import { AddClientModalProps } from "./interfaces";

export const AddClientModal = ({
  handleCreateClient,
  close,
}: AddClientModalProps) => (
  <ClientForm mode="create" onSubmit={handleCreateClient} close={close} />
);
