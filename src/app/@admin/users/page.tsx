"use client";

import { Button, Pagination } from "@/shared/ui";
import { useModal } from "@/shared/providers";

import { useUsers } from "./hooks";
import {
  AddUserModal,
  DeleteUserModal,
  UpdateUserModal,
  UserCard,
} from "./components";
import { UserI } from "./types/user.types";
import Page from "@/shared/components/Page";
import { SearchInput } from "@/shared/components/SearchInput";
import { CardGrid } from "@/shared/components/CardGrid";

const appConfig = {
  title: "Usuarios",
  currentPath: "/users",
};

export default function UsersPage() {
  const { open, close } = useModal();

  const {
    users,
    loading,
    currentPage,
    totalPages,
    pageSize,
    onPaginationChange,
    search,
    onSearchChange,
    activeSearch,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    mutationLoading,
  } = useUsers();

  const handleOpenCreateModal = () => {
    open(<AddUserModal handleCreateUser={handleCreateUser} close={close} />, {
      position: "right",
    });
  };

  const handleOpenEditModal = (values: UserI) => {
    open(
      <UpdateUserModal
        handleUpdateUser={handleUpdateUser}
        close={close}
        values={values}
      />,
      { position: "right" }
    );
  };

  const handleOpenDeleteModal = (values: UserI) => {
    open(
      <DeleteUserModal
        handleDeleteUser={handleDeleteUser}
        close={close}
        values={values}
      />,
      { size: "xsmall", fullHeight: false }
    );
  };

  return (
    <Page title={appConfig.title}>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col-reverse gap-3 mt-2 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Buscar usuario por nombre o correo"
          />
          <Button
            type="button"
            variant="border"
            size="md"
            color="primary"
            onClick={handleOpenCreateModal}
            disabled={mutationLoading || loading}
          >
            Agregar Usuario
          </Button>
        </div>

        <CardGrid
          items={users}
          loading={loading}
          pageSize={pageSize}
          emptyTitle={
            activeSearch ? `Sin resultados para "${activeSearch}"` : "No hay usuarios agregados"
          }
          emptySubtitle={
            activeSearch
              ? "Prueba con otro nombre o correo"
              : 'Agrega tu primer empleado con el botón "Agregar Usuario"'
          }
          renderItem={(user) => (
            <UserCard
              key={user.id}
              user={user}
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
