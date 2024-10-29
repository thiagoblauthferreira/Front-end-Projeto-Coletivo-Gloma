import React from "react";
import { Alert, Button } from "../../../common";
import { ModalConfirmAction, ModalProduct } from "../../../modals";
import { Search } from "../../../search";
import { TableProducts } from "../../../tables/products";
import { useDistribuitionPointProvider } from "../context";
import { useAuthProvider } from "../../../../context/Auth";
import { IProduct } from "../../../../interfaces/products";
import { IoWarningOutline } from "react-icons/io5";
import productOptions from "../../../modals/Product/product.list";

interface TabProductsProps {
  statusSolicitation: "requested" | "received";
  distributionPointId?: string; 
  isCoordinator?: boolean;
}
export function TabProducts({ distributionPointId, statusSolicitation }: TabProductsProps) {
  const {
    handleFilter,
    handleProducts,
    handleCreateProduct,
    handleDeleteProduct,
    handleUpdateProduct,
    setOpenModalProduct,
    handleProduct,
    setOpenModalUpdateProduct,
    setOpenModalConfirmActionProduct,
    products,
    openModalProduct,
    openModalUpdateProduct,
    openModalConfirmActionProduct,
    requesting,
  } = useDistribuitionPointProvider();
  const { currentUser } = useAuthProvider();

  const [product, setProduct] = React.useState<IProduct>();

  const onProduct = async (productId: string, action: "delete" | "update") => {
    const product = await handleProduct(productId);
    setProduct(product);

    if (action === "update") {
      setOpenModalUpdateProduct(true);
    } else {
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

          {currentUser?.isDonor && (           
            <Button
              text="Doar produto"
              className="bg-black text-white"
              disabled={requesting}
              onClick={() => setOpenModalProduct(true)}
            />
          
          )}

            {currentUser?.isCoordinator && (           
            <Button
              text="Doar/Solicitar produto"
              className="bg-black text-white"
              disabled={requesting}
              onClick={() => setOpenModalProduct(true)}
            />
          
          )}
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
        
        <TableProducts
          total={filteredProducts.length}
          dataSource={filteredProducts}
          handleDeleteProduct={(productId) => onProduct(productId, "delete")}
          handleUpdateProduct={(productId) => onProduct(productId, "update")}
          onPaginate={handleProducts}
          requesting={requesting}
          textNotFound="Nenhum produto encontrado"
        />
      </div>

      <ModalProduct
        open={openModalProduct}
        close={() => setOpenModalProduct(false)}
        onSubmit={handleCreateProduct}
        distributionPointId={distributionPointId} isCoordinator={currentUser?.isCoordinator}      />

      <ModalProduct
        open={openModalUpdateProduct}
        close={() => setOpenModalUpdateProduct(false)}
        onSubmit={(data) => handleUpdateProduct(product?.id || "", data)}
        modalType="update"
        product={product}
        distributionPointId={distributionPointId} isCoordinator={currentUser?.isCoordinator}      />

      <ModalConfirmAction
        title="Tem certeza que deseja remover esse produto?"
        open={openModalConfirmActionProduct}
        close={() => setOpenModalConfirmActionProduct(false)}
        onSubmit={() => handleDeleteProduct(product?.id || "")}
      />
    </div>
  );
}
