import React from "react";
import {
  IContextProvider,
  ICoordinatorsInitialData,
  IShelterProvider,
} from "./interface";
import { IShelter, IShelterUpdate } from "../../../../interfaces/shelter";
import { useNavigate, useParams } from "react-router-dom";
import { toastMessage } from "../../../../helpers/toast-message";
import { toast } from "react-toastify";
import {
  addCoordinator,
  deleteShelter,
  listCoordinators,
  removeCoordinator,
  updateShelter,
} from "../../../../services/shelter.service";
import { IPaginate } from "../../../common/Table/interface";
import { useAuthProvider } from "../../../../context/Auth";

const ShelterContext = React.createContext<IShelterProvider>({} as IShelterProvider);

export function ShelterProvider({
  children,
  initialCoordinators,
  initialShelter,
}: IContextProvider) {
  const { id = "" } = useParams();
  const navigation = useNavigate();
  const { currentUser } = useAuthProvider();

  const filteredRef = React.useRef({});

  const [requesting, setRequesting] = React.useState<boolean>(false);

  const [openModalConfirmActionS, setOpenModalConfirmActionS] =
    React.useState<boolean>(false);
  const [openModalRemoveCoordinator, setOpenModalRemoveCoordinator] =
    React.useState<boolean>(false);
  const [coordinators, setCoordinators] =
    React.useState<ICoordinatorsInitialData>(initialCoordinators);
  const [shelter, setShelter] = React.useState<IShelter>(initialShelter);

  const updateShelterState = (data: object) => {
    setShelter((currentShelter) => {
      return { ...currentShelter, ...data };
    });
  };

  const handleFilter = async (filter: object) => {
    filteredRef.current = filter;

    try {
      setRequesting(true);

      const resp = await listCoordinators(id, filteredRef.current);
      setCoordinators(resp);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleCoordinators = async (pagination?: IPaginate) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    filteredRef.current = { ...filteredRef.current, ...pagination };

    try {
      setRequesting(true);

      const resp = await listCoordinators(id, filteredRef.current);
      setCoordinators(resp);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleSubscribeShelter = async () => {
    if (!currentUser) return;

    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      await addCoordinator(id, { coordinatorId: currentUser.id });
      handleCoordinators();
      updateShelterState({ isSubscribe: true });

      toast.success("Coordenador adicionado ao abrigo");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleRemoveCoordinator = async (coordinatorId: string) => {
    if (!currentUser) return;

    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      await removeCoordinator(id, { coordinatorId: coordinatorId });
      handleCoordinators();
      updateShelterState({ isSubscribe: false });
      setOpenModalRemoveCoordinator(false);

      toast.success("Coordenador removido do abrigo");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleUpdateShelter = async (data: IShelterUpdate) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);
      await updateShelter(id, data);
      updateShelterState(data);

      toast.success("Abrigo atualizado");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleDeleteShelter = async (shelterId: string) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      await deleteShelter(shelterId);
      setOpenModalConfirmActionS(false);

      toast.success("Abrigo deletado");
      navigation("/shelters");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <ShelterContext.Provider
      value={{
        handleUpdateShelter,
        handleFilter,
        handleCoordinators,
        setOpenModalConfirmActionS,
        setOpenModalRemoveCoordinator,
        handleDeleteShelter,
        handleSubscribeShelter,
        handleRemoveCoordinator,
        updateShelterState,
        shelter,
        coordinators,
        openModalConfirmActionS,
        openModalRemoveCoordinator,
        requesting,
      }}
    >
      {children}
    </ShelterContext.Provider>
  );
}

export const useShelterProvider = () => {
  return React.useContext(ShelterContext);
};
