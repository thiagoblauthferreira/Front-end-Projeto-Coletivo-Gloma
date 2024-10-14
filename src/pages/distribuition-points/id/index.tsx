import React from "react";
import { LoadingScreen, Tabs } from "../../../components/common";
import {
  TabDistribuitionPointSettings,
  TabProducts,
  TabDistribuitionPointDetails,
} from "../../../components/pages/DistribuitionPoints/tabs";
import { DistribuitionPointProvider } from "../../../components/pages/DistribuitionPoints/context";
import { useAuthProvider } from "../../../context/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { listOneDistribuitionPoint } from "../../../services/distribuition-points.service";
import { IDistribuitionPoint } from "../../../interfaces/distriuition-points";
import { IProductsInitialData } from "../../../components/pages/DistribuitionPoints/context/interface";
import { listProducts } from "../../../services/products.service";
import { toast } from "react-toastify";
import { TabsStock } from "../../../components/pages/DistribuitionPoints/tabs/TabStock";

const initialData = {
  data: [],
  total: 0,
};

function DistribuitionPointScreen() {
  const navigation = useNavigate();
  const { id = "" } = useParams();
  const { currentUser } = useAuthProvider();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [initialProducts, setInitialProducts] =
    React.useState<IProductsInitialData>(initialData);
  const [initialDistribuitionPoint, setInitialDistribuitionPoint] =
    React.useState<IDistribuitionPoint>();

  const load = async () => {
    try {
      setLoading(true);

      const [respDistribuitionPoint, respProducts] = await Promise.all([
        listOneDistribuitionPoint(id || ""),
        listProducts({ distribuitionPointId: id }),
      ]);

      setInitialDistribuitionPoint(respDistribuitionPoint);
      setInitialProducts(respProducts);
    } catch (error) {
      console.error(error);
      toast.warn("Ponto de distribuição não encontrado");
      navigation("/");
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
      children: <TabDistribuitionPointDetails />,
    },
    {
      key: "products",
      label: "Produtos",
      children: <TabProducts />,
    },
    {
      key: "stock",
      label: "Estoque",
      children: <TabsStock />,
    },
  ];

  if (
    initialDistribuitionPoint &&
    initialDistribuitionPoint.creator.id === currentUser?.id
  ) {
    tabs.push({
      key: "settings",
      label: "Atualizar",
      children: <TabDistribuitionPointSettings />,
    });
  }

  if (!initialDistribuitionPoint) return <></>;

  return (
    <DistribuitionPointProvider
      initialDistribuitionPoint={initialDistribuitionPoint!}
      initialProducts={initialProducts}
    >
      <LoadingScreen loading={loading} />
      <div className="py-8">
        <Tabs tabs={tabs} />
      </div>
    </DistribuitionPointProvider>
  );
}

export default DistribuitionPointScreen;
