import React from "react";
import { Alert, Button } from "../../../common";
import { ModalConfirmAction, ModalProduct } from "../../../modals";
import { Search } from "../../../search";
import { TableProducts } from "../../../tables/products";
import { useDistribuitionPointProvider } from "../context";
import { useAuthProvider } from "../../../../context/Auth";
import { IProduct } from "../../../../interfaces/products";
import { IoWarningOutline } from "react-icons/io5";

export function TabProducts() {
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
                options: [
                  { label: "Todos", value: "" },
                  { label: "Perecível", value: "perishable" },
                  { label: "Não perecível", value: "not_perishable" },
                ],
              },
            ]}
          />

          {currentUser && (
            <Button
              text="Doar produto"
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
          total={products.total}
          dataSource={products.data}
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
      />

      <ModalProduct
        open={openModalUpdateProduct}
        close={() => setOpenModalUpdateProduct(false)}
        onSubmit={(data) => handleUpdateProduct(product?.id || "", data)}
        modalType="update"
        product={product}
      />

      <ModalConfirmAction
        title="Tem certeza que deseja remover esse produto?"
        open={openModalConfirmActionProduct}
        close={() => setOpenModalConfirmActionProduct(false)}
        onSubmit={() => handleDeleteProduct(product?.id || "")}
      />
    </div>
  );
}
