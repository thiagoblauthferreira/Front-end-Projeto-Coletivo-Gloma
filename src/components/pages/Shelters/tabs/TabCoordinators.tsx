import React from "react";
import { Search } from "../../../search";
import { useAuthProvider } from "../../../../context/Auth";
import { TableCoordinators } from "../../../tables";
import { useShelterProvider } from "../context";
import { Alert, Button } from "../../../common";
import { IoWarningOutline } from "react-icons/io5";
import { ModalConfirmAction } from "../../../modals";
import { IUser } from "../../../../interfaces/user";

export function TabCoordinators() {
  const {
    coordinators,
    requesting,
    openModalRemoveCoordinator,
    shelter,
    handleCoordinators,
    handleFilter,
    handleSubscribeShelter,
    handleRemoveCoordinator,
    setOpenModalRemoveCoordinator,
  } = useShelterProvider();
  const { currentUser } = useAuthProvider();

  const [coordinator, setCoordinator] = React.useState<IUser>();

  const onCoordinator = async (coordinator: IUser) => {
    setCoordinator(coordinator);
    setOpenModalRemoveCoordinator(true);
  };

  return (
    <div>
      <div className="my-5">
        <p className="font-semibold mb-2">Filtrar por</p>
        <div
          className={`
            flex flex-col gap-4 md:flex-row
          `}
        >
          <Search
            className="gap-4 w-full"
            onFilter={handleFilter}
            options={[
              {
                optionKey: "search",
                type: "input",
              },
            ]}
          />

          {currentUser && currentUser.isCoordinator && (
            <Button
              text={shelter.isSubscribe ? "Sair do abrigo" : "Inscrever-se no abrigo"}
              className="bg-black text-white"
              disabled={requesting}
              onClick={() => {
                if (shelter.isSubscribe) {
                  handleRemoveCoordinator(currentUser.id);
                } else {
                  handleSubscribeShelter();
                }
              }}
            />
          )}
        </div>

        {currentUser && !currentUser.isCoordinator && (
          <Alert icon={<IoWarningOutline />} type="alert-warning" className="mt-4">
            <p>Para inscrever-se nesse abrigo, você precisa ser um coordenador.</p>
          </Alert>
        )}
      </div>

      <div>
        <TableCoordinators
          total={coordinators.total}
          dataSource={coordinators.data}
          onPaginate={handleCoordinators}
          handleRemoveCoordinator={(coordinator) => onCoordinator(coordinator)}
          requesting={requesting}
          shelter={shelter}
          textNotFound="Nenhum coordenador encontrado"
        />
      </div>

      {shelter.creator.id === currentUser?.id && (
        <ModalConfirmAction
          title="Tem certeza que deseja remover esse coordenador?"
          open={openModalRemoveCoordinator}
          close={() => setOpenModalRemoveCoordinator(false)}
          onSubmit={() => handleRemoveCoordinator(coordinator?.id || "")}
        />
      )}
    </div>
  );
}
