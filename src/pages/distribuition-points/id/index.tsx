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
import { listOneDistribuitionPoint, listStaticsDistribuitionPointRequested } from "../../../services/distribuition-points.service";
import { IDistribuitionPoint } from "../../../interfaces/distriuition-points";
import { IProductsInitialData } from "../../../components/pages/DistribuitionPoints/context/interface";
import { listProducts } from "../../../services/products.service";
import { toast } from "react-toastify";
import { TabProductsRequested } from "../../../components/pages/DistribuitionPoints/tabs/TabProductsRequested";
import { IProductInventory } from "../../../interfaces/statistics";

const initialData = {
  data: [],
  total: 0,
};

const initialDataStatics = {
  totalProducts: 0,
  totalQuantityProducts: 0,
  products: [],
  productsFood: []
}

function DistribuitionPointScreen() {
  const navigation = useNavigate();
  const { id = "" } = useParams();
  const { currentUser } = useAuthProvider();

  const [loading, setLoading] = React.useState<boolean>(true);

  const [initialProducts, setInitialProducts] =
    React.useState<IProductsInitialData>(initialData);
  const [initialDistribuitionPoint, setInitialDistribuitionPoint] =
    React.useState<IDistribuitionPoint>();

  const [initialIStatistics, setInitialInventory] =
    React.useState<IProductInventory>(initialDataStatics);

  const load = async () => {
    try {
      setLoading(true);

      const [respDistribuitionPoint, respProducts, respInventory] = await Promise.all([
        listOneDistribuitionPoint(id || ""),
        listProducts({ 
          distributionPointId: id
        }),
        listStaticsDistribuitionPointRequested(id)
      ]);
      
      setInitialDistribuitionPoint(respDistribuitionPoint);
      setInitialProducts(respProducts);
      setInitialInventory(respInventory);
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
      key: "products-receives",
      label: "Produtos em estoque",
      children: <TabProducts distributionPointId={initialDistribuitionPoint?.id} statusSolicitation={"received"} isCoordinator={currentUser?.isCoordinator} />,
    },
    {
      key: "products-requestes",
      label: "Produtos solicitados",
      children: <TabProductsRequested distributionPointId={initialDistribuitionPoint?.id} statusSolicitation={"requested"} isCoordinator={currentUser?.isCoordinator} />,
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
      initialIStatistics={initialIStatistics}
    >
      <LoadingScreen loading={loading} />
      <div className="py-8">
        <Tabs tabs={tabs} />
      </div>
    </DistribuitionPointProvider>
  );
}

export default DistribuitionPointScreen;
