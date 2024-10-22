import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal, Select, Textarea } from "../../common";
import { IProduct, IProductCreate } from "../../../interfaces/products";
import { productSchema } from "../../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import productOptions from "./product.list";
import { weightMask } from "../../../utils/masks";

interface IModalProduct {
  close: () => void;
  open: boolean;
  onSubmit: (data: IProductCreate) => void;
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
  product,
  distributionPointId,
  isCoordinator
  
}: IModalProduct) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IProductCreate>({ resolver: zodResolver(productSchema) });
  const [isPerishable, setIsPerishable] = React.useState(true);

  const onFinish = (data: IProductCreate, actionType: "requested" | "received") => {
    data.status = actionType
    distributionPointId ? data.distributionPointId = distributionPointId : data.distributionPointId = "" ;
    if(!isPerishable){
      delete data.weight
    }
    onSubmit(data);
    setIsPerishable(true)
    reset();    
  };
  const handleChange = (value: string) => {
    if(value === 'perishable' || value === 'non_perishable'){
      setIsPerishable(true);
    }else{
      setIsPerishable(false);
    }
    
  };

  React.useEffect(() => {
    if (product) {
      for (const k in product) {
        const key = k as keyof IProduct;
        setValue(key as any, product[key]);
      }
    }
  }, [product, modalType]);

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
          onSubmit={handleSubmit((data) => onFinish(data, "requested"))}>
          <Input
            label="Nome: "
            placeholder="Digite o nome"
            {...register("name")}
            errors={errors}
          />

          <Select
            label="Tipo: "
            {...register("type")}
            options={productOptions}
            onChange={(e) => handleChange(e.target.value)}
            errors={errors}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Quantidade: "
              placeholder="Digite a quantidade"
              type="number"
              {...register("quantity")}
              errors={errors}
            />

            {isPerishable && (
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
            onClick={handleSubmit((data) => onFinish(data, "received"))}
            className="w-full mt-4 bg-black text-white"
          />
          {isCoordinator ? (
          <Button
            type="button"
            text="Requisitar produto"
            onClick={handleSubmit((data) => onFinish(data, "requested"))}
            className="w-full mt-4 bg-black text-white"
          />
        ) : null}
        </form>
      </div>
    </Modal>
  );
}
