"use client";

import { Button, Pagination } from "@/shared/ui";
import { useModal } from "@/shared/providers";

import { useClients } from "./hooks";
import {
  AddClientModal,
  DeleteClientModal,
  UpdateClientModal,
  ClientCard,
} from "./components";
import { ClientI } from "./types/client.types";
import Page from "@/shared/components/Page";
import { CardGrid } from "@/shared/components/CardGrid";

const appConfig = {
  title: "Clientes",
  currentPath: "/clients",
};

export default function ClientsPage() {
  const { open, close } = useModal();

  const {
    clients,
    loading,
    currentPage,
    totalPages,
    pageSize,
    onPaginationChange,
    handleCreateClient,
    handleDeleteClient,
    handleEditClient,
    mutationLoading,
  } = useClients();

  const handleOpenCreateModal = () => {
    open(
      <AddClientModal handleCreateClient={handleCreateClient} close={close} />,
      { position: "right" }
    );
  };

  const handleOpenEditModal = (values: ClientI) => {
    open(
      <UpdateClientModal
        handleUpdateClient={handleEditClient}
        close={close}
        values={values}
      />,
      { position: "right" }
    );
  };

  const handleOpenDeleteModal = (values: ClientI) => {
    open(
      <DeleteClientModal
        handleDeleteClient={handleDeleteClient}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false }
    );
  };

  return (
    <Page title={appConfig.title}>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-10rem)]">
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

        <CardGrid
          items={clients}
          loading={loading}
          pageSize={pageSize}
          emptyTitle="No hay clientes agregados"
          emptySubtitle='Agrega tu primer cliente con el botón "Agregar Cliente"'
          renderItem={(client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          )}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={(page) => onPaginationChange(page, pageSize)}
            onPageSizeChange={(size) => onPaginationChange(1, size)}
            pageSizeOptions={[10, 20, 50]}
          />
        )}
      </div>
    </Page>
  );
}
