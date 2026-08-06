"use client";

import { Layout, Button, Table, Heading } from "@/shared/ui";
import { useModal } from "@/shared/providers";

import { useUsers } from "./hooks";
import { AddUserModal, DeleteUserModal, UpdateUserModal } from "./components";
import { UserI } from "./types/user.types";

const appConfig = {
  title: "Usuarios",
  currentPath: "/users",
};

export default function UsersPage() {
  const actions = ["edit", "delete"];
  const { open, close } = useModal();

  const {
    users,
    loading,
    currentPage,
    totalPages,
    pageSize,
    onPaginationChange,
    cols,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    mutationLoading,
  } = useUsers();

  const handleOpenCreateModal = () => {
    open(
      <AddUserModal 
        handleCreateUser={handleCreateUser}
        close={close}
      />,
      { fullHeight: false },
    );
  };

  const handleOpenEditModal = (values: UserI) => {
    open(
      <UpdateUserModal
        handleUpdateUser={handleUpdateUser}
        close={close}
        values={values}
      />,
      { fullHeight: false },
    );
  };

  const handleOpenDeleteModal = (values: UserI) => {
    open(
      <DeleteUserModal
        handleDeleteUser={handleDeleteUser}
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
            Agregar Usuario
          </Button>
        </div>

        {users.length !== 0 ? (
          <div className="overflow-auto mt-10">
            <Table
              withPagination
              currentPage={currentPage}
              totalPages={totalPages}
              currentLimit={pageSize}
              onPaginationChange={onPaginationChange}
              data={users}
              columns={cols}
              path={(row) => `/users/${row.original.id}`}
              loading={loading}
              actions={actions}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <Heading variant="sectionHeadingCard">
              No hay usuarios agregados
            </Heading>
          </div>
        )}
      </div>
    </Layout>
  );
}
