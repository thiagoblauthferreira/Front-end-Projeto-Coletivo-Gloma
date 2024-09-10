import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShelterProvider } from "../../../components/pages/Shelters/context";
import { useAuthProvider } from "../../../context/Auth";
import { LoadingScreen, Tabs } from "../../../components/common";
import { ICoordinatorsInitialData } from "../../../components/pages/Shelters/context/interface";
import { IShelter } from "../../../interfaces/shelter";
import { toast } from "react-toastify";
import { listCoordinators, listOneShelter } from "../../../services/shelter.service";
import {
  TabShelterSettings,
  TabCoordinators,
  TabShelterDetails,
} from "../../../components/pages/Shelters/tabs";

const initialData = {
  data: [],
  total: 0,
};

function CoordinatorsScreen() {
  const navigation = useNavigate();
  const { id = "" } = useParams();
  const { currentUser } = useAuthProvider();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [initialCoordinators, setInitialCoordinators] =
    React.useState<ICoordinatorsInitialData>(initialData);
  const [initialShelter, setInitialShelter] = React.useState<IShelter>();

  const load = async () => {
    try {
      setLoading(true);

      const [respShelter, respCoordinators] = await Promise.all([
        listOneShelter(id || ""),
        listCoordinators(id),
      ]);

      console.log(respShelter);

      setInitialShelter(respShelter);
      setInitialCoordinators(respCoordinators);
    } catch (error) {
      console.error(error);
      toast.warn("Abrigo não encontrado");
      navigation("/shelters");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const tabs = [
    {
      key: "details",
      label: "Detalhes",
      children: <TabShelterDetails />,
    },
    {
      key: "coordinators",
      label: "Coordenadores",
      children: <TabCoordinators />,
    },
  ];

  if (initialShelter && initialShelter.creator.id === currentUser?.id) {
    tabs.push({
      key: "settings",
      label: "Atualizar",
      children: <TabShelterSettings />,
    });
  }

  if (!initialShelter) return <></>;

  return (
    <ShelterProvider
      initialShelter={initialShelter!}
      initialCoordinators={initialCoordinators}
    >
      <LoadingScreen loading={loading} />
      <div className="py-8">
        <Tabs tabs={tabs} />
      </div>
    </ShelterProvider>
  );
}

export default CoordinatorsScreen;
