import React from "react";
import { Alert } from "../../../common";
import { ModalConfirmAction, ModalProduct } from "../../../modals";
import { Search } from "../../../search";
import { useDistribuitionPointProvider } from "../context";
import { useAuthProvider } from "../../../../context/Auth";
import { IProduct } from "../../../../interfaces/products";
import { IoWarningOutline } from "react-icons/io5";
import productOptions from "../../../modals/Product/product.list";
import { TableRequestesProducts } from "../../../tables/productsRequested";
import { ModalDonateProduct } from "../../../modals/Product/Donate";

interface TabProductsRequestedProps {
  statusSolicitation: "requested" | "received";
  distributionPointId?: string; 
  isCoordinator?: boolean;
}
export function TabProductsRequested({ distributionPointId, statusSolicitation }: TabProductsRequestedProps) {
  const {
    handleFilter,
    handleProducts,
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
    handleDonateProduct,
    setOpenModalProduct,
    handleProduct,
    setOpenModalUpdateProduct,
    setOpenModalConfirmActionProduct,
    setOpenModalDonateProduct,
    products,
    openModalProduct,
    openModalUpdateProduct,
    openModalConfirmActionProduct,
    openModalDonateProduct,
    requesting  } = useDistribuitionPointProvider();
  const { currentUser } = useAuthProvider();

  const [product, setProduct] = React.useState<IProduct>();

  const onProduct = async (productId: string, action: "delete" | "update" | "donate") => {
    if(action === "donate"){
      setOpenModalDonateProduct(true)
    }
    const product = await handleProduct(productId);
    setProduct(product);
    
    if (action === "update") {
      setOpenModalUpdateProduct(true);
    } else if (action === "donate") {
      setOpenModalDonateProduct(true);
    }  else {
      setOpenModalConfirmActionProduct(true);
    }
  };
// Filtrando os produtos com base no status
const filteredProducts = products.data.filter((product) => { 
  
  if (statusSolicitation === "requested") {    
    return product.status !== "received";
  } else if (statusSolicitation === "received") {
    return product.status !== "requested";
  }
  return true; 
});

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
                  {
                    optionKey: "type",
                    type: "select",
                    options: productOptions
                  },
                ]}
              />
          </div>

        {!currentUser && (
          <Alert icon={<IoWarningOutline />} type="alert-warning" className="mt-4">
            <p>
              Para fazer doações neste ponto de distribuição, você precisa estar logado.
            </p>
          </Alert>
        )}
      </div>

      <div>
        
        <TableRequestesProducts
          total={filteredProducts.length}
          dataSource={filteredProducts}
          handleDeleteProduct={(productId) => onProduct(productId, "delete")}
          handleUpdateProduct={(productId) => onProduct(productId, "update")}
          handleDonorProduct={(productId) => onProduct(productId, "donate")}
          onPaginate={handleProducts}
          requesting={requesting}
          textNotFound="Nenhum produto encontrado"
        />
      </div>

      <ModalProduct
        open={openModalProduct}
        close={() => setOpenModalProduct(false)}
        onSubmit={handleCreateProduct}
        distributionPointId={distributionPointId}
        isCoordinator={currentUser?.isCoordinator}/>

      <ModalProduct
        open={openModalUpdateProduct}
        close={() => setOpenModalUpdateProduct(false)}
        onSubmit={(data) => handleUpdateProduct(product?.id || "", data)}
        modalType="update"
        product={product}
        distributionPointId={distributionPointId}
        isCoordinator={currentUser?.isCoordinator}      />

      <ModalConfirmAction
        title="Tem certeza que deseja remover esse produto?"
        open={openModalConfirmActionProduct}
        close={() => setOpenModalConfirmActionProduct(false)}
        onSubmit={() => handleDeleteProduct(product?.id || "")}
      />

      <ModalDonateProduct 
        close={() => setOpenModalDonateProduct(false)}
        open={openModalDonateProduct}
        onSubmit={handleDonateProduct}
        product={product}
      />
    </div>
  );
}
