import React from "react";
import {
  IContextProvider,
  IDistribuitionPointProvider,
  IProductsInitialData,
} from "./interface";
import {
  deleteDistribuitionPoint,
  listStaticsDistribuitionPointRequested,
  updateDistribuitionPoints,
} from "../../../../services/distribuition-points.service";
import { IProductCreate, IProductUpdate } from "../../../../interfaces/products";
import {
  IDistribuitionPoint,
  IDistribuitionPointUpdate,
} from "../../../../interfaces/distriuition-points";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listOneProduct,
  listProducts,
  updateProduct,
} from "../../../../services/products.service";
import { toast } from "react-toastify";
import { toastMessage } from "../../../../helpers/toast-message";
import { IPaginate } from "../../../common/Table/interface";
import { IProductInventory } from "../../../../interfaces/statistics";

const DistribuitionPointContext = React.createContext<IDistribuitionPointProvider>(
  {} as IDistribuitionPointProvider
);

export function DistribuitionPointProvider({
  children,
  initialDistribuitionPoint,
  initialProducts,
  initialIStatistics
}: IContextProvider) {
  const { id = "" } = useParams();
  const navigation = useNavigate();

  const filteredRef = React.useRef({});

  const [requesting, setRequesting] = React.useState<boolean>(false);

  const [openModalProduct, setOpenModalProduct] = React.useState<boolean>(false);
  const [openModalConfirmActionProduct, setOpenModalConfirmActionProduct] =
    React.useState<boolean>(false);
  const [openModalConfirmActionDP, setOpenModalConfirmActionDP] =
    React.useState<boolean>(false);
  const [openModalUpdateProduct, setOpenModalUpdateProduct] =
    React.useState<boolean>(false);
  const [products, setProducts] = React.useState<IProductsInitialData>(initialProducts);
  const [statistics, setStatistics] = React.useState<IProductInventory>(initialIStatistics);
  const [distribuitionPoint, setDistribuitionPoint] = React.useState<IDistribuitionPoint>(
    initialDistribuitionPoint
  );

  const updateDistribuitionPointState = (data: object) => {
    setDistribuitionPoint((currentDistribuitionPoint) => {
      return { ...currentDistribuitionPoint, ...data };
    });
  };

  const handleFilter = async (filter: any) => {
    filteredRef.current = filter;

    try {
      setRequesting(true);
      const resp = await listProducts(filteredRef.current);
      setProducts(resp);
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleProducts = async (pagination?: IPaginate) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    filteredRef.current = { ...filteredRef.current, ...pagination };

    try {
      setRequesting(true);

      const resp = await listProducts(filteredRef.current);
      setProducts(resp);
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleCreateProduct = async (data: IProductCreate) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    const newData = { ...data, distribuitionPointId: id };
    newData.quantity = Number(data.quantity);

    try {
      setRequesting(true);

      const respProduct = await createProduct(newData);

      setProducts((currentProducts) => {
        return {
          data: [respProduct, ...currentProducts.data],
          total: currentProducts.total + 1,
        };
      });
      setOpenModalProduct(false);

      toast.success("Novo produto criado ao ponto de distribuição");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleUpdateProduct = async (productId: string, data: IProductUpdate) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    const newData = { ...data, distribuitionPointId: id };
    newData.quantity = Number(data.quantity);

    try {
      setRequesting(true);

      const respProduct = await updateProduct(productId, newData);

      setProducts((currentProducts) => {
        const productsData = currentProducts.data;
        const filteredProducts = productsData.map((product) => {
          if (product.id === productId) {
            return { ...product, ...respProduct };
          }
          return product;
        });

        return {
          ...currentProducts,
          data: filteredProducts,
        };
      });
      setOpenModalProduct(false);

      toast.success("Produto atualizado");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      await deleteProduct(productId);
      handleProducts();

      setOpenModalConfirmActionProduct(false);

      toast.success("Produto deletado");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleProduct = async (productId: string) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      const respProduct = await listOneProduct(productId);

      return respProduct;
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDistribuitionPoint = async (data: IDistribuitionPointUpdate) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);
      await updateDistribuitionPoints(id, data);
      updateDistribuitionPointState(data);

      toast.success("Ponto de distribuição atualizado");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleDeleteDistribuitionPoint = async (distribuitionPointId: string) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      await deleteDistribuitionPoint(distribuitionPointId);

      setOpenModalConfirmActionDP(false);

      toast.success("Ponto de distribuição deletado");
      navigation("/");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  };

  const handleStatistics = async (distribuitionPointId: string) => {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }
    try {
      const data = await listStaticsDistribuitionPointRequested(distribuitionPointId)
      console.log(data)
      setStatistics(data);
    } catch (error) {
      console.log(error)
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    }

  }
  return (
    <DistribuitionPointContext.Provider
      value={{
        handleFilter,
        handleProducts,
        setOpenModalProduct,
        setOpenModalUpdateProduct,
        setOpenModalConfirmActionProduct,
        setOpenModalConfirmActionDP,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleProduct,
        handleUpdateDistribuitionPoint,
        handleDeleteDistribuitionPoint,
        updateDistribuitionPointState,
        handleStatistics,
        products,
        openModalProduct,
        openModalUpdateProduct,
        openModalConfirmActionProduct,
        openModalConfirmActionDP,
        distribuitionPoint,
        requesting,
        statistics,
      }}
    >
      {children}
    </DistribuitionPointContext.Provider>
  );
}

export const useDistribuitionPointProvider = () => {
  return React.useContext(DistribuitionPointContext);
};
