import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal } from "../../common";
import { IProduct, IProductDonate } from "../../../interfaces/products";
import { productSchema } from "../../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { weightMask } from "../../../utils/masks";

interface IModalProduct {
  close: () => void;
  open: boolean;
  onSubmit: (data: IProductDonate) => void;
  modalType?: "create";
  product?: IProduct;
  distributionPointId?: string;
  isCoordinator?: boolean;
}

export function ModalDonateProduct({
  close,
  open,
  onSubmit,
  modalType = "create",
  product
  
}: IModalProduct) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IProductDonate>();

  const onFinish = (data: IProductDonate) => {   
    const formData = { ...data, productReferenceID: product!.id }; 
    if(product?.type ==='non_perishable' || product?.type === 'perishable'){
      onSubmit(formData);         
    }
    delete formData.weight;

    onSubmit(formData);
    reset();      
  };
  
  const weight: string = watch("weight") ?? "";

  React.useEffect(() => {
    setValue("weight", weightMask(weight));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weight]);

  return (
    <Modal
      open={open}
      close={close}
      header={
        <div className="p-4">
          <p className="font-semibold text-lg">
            {modalType === "create" ? "Doar" : "Atualizar"} produto
          </p>
        </div>
      }
    >
      <div className="p-4 pt-10">
        <form
          className={`
            grid grid-flow-row auto-rows-max
            gap-2
          `}
          onSubmit={handleSubmit(onFinish)}>
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Quantidade: "
              placeholder="Digite a quantidade"
              type="number"
              {...register("quantity")}
              errors={errors}
            />

            {(product?.type === 'perishable' || product?.type === 'non_perishable') && (
              <Input
                label="Peso: "
                placeholder="Digite o peso: 10.50"
                {...register("weight")}
                errors={errors}
              />
            )}
          </div>

          <Button
            type="submit"
            text={`${modalType === "create" ? "Doar" : "Atualizar"} produto`}
            onClick={handleSubmit((data) => onFinish(data))}
            className="w-full mt-4 bg-black text-white"
          />
        </form>
      </div>
    </Modal>
  );
}
