"use client";

import { Layout, Button, Table, Heading } from "@/shared/ui";
import { useModal } from "@/shared/providers";

import { useClients } from "./hooks";
import {
  AddClientModal,
  DeleteClientModal,
  UpdateClientModal,
} from "./components";
import { ClientI } from "./types/client.types";

const appConfig = {
  title: "Clientes",
  currentPath: "/clients",
};

export default function ClientsPage() {
  const actions = ["edit", "delete"];
  const { open, close } = useModal();

  const {
    clients,
    loading,
    currentPage,
    totalPages,
    pageSize,
    onPaginationChange,
    cols,
    handleCreateClient,
    handleDeleteClient,
    handleEditClient,
    mutationLoading,
  } = useClients();

  const handleOpenCreateModal = () => {
    open(
      <AddClientModal
        handleCreateClient={handleCreateClient}
        close={close}
      />,
      { fullHeight: false },
    );
  };

  const handleOpenEditModal = (values: ClientI) => {
    open(
      <UpdateClientModal
        handleUpdateClient={handleEditClient}
        close={close}
        values={values}
      />,
      { fullHeight: false },
    );
  };

  const handleOpenDeleteModal = (values: ClientI) => {
    open(
      <DeleteClientModal
        handleDeleteClient={handleDeleteClient}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false },
    );
  };

  return (
    <Layout appConfig={appConfig}>
      <div className="h-screen w-full">
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            variant="border"
            size="md"
            color="primary"
            onClick={handleOpenCreateModal}
            disabled={mutationLoading || loading}
          >
            Agregar Cliente
          </Button>
        </div>

        {clients.length !== 0 ? (
          <div className="overflow-auto mt-10">
            <Table
              withPagination
              currentPage={currentPage}
              totalPages={totalPages}
              currentLimit={pageSize}
              onPaginationChange={onPaginationChange}
              data={clients}
              columns={cols}
              path={(row) => `/clients/${row.original.id}`}
              loading={loading}
              actions={actions}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Heading variant="sectionHeadingCard">
              No hay clientes agregados
            </Heading>
          </div>
        )}
      </div>
    </Layout>
  );
}
