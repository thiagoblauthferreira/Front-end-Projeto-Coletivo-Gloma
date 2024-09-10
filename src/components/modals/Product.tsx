import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal, Select, Textarea } from "../common";
import { IProduct, IProductCreate } from "../../interfaces/products";
import { productSchema } from "../../validators";
import { zodResolver } from "@hookform/resolvers/zod";

interface IModalProduct {
  close: () => void;
  open: boolean;
  onSubmit: (data: IProductCreate) => void;
  modalType?: "create" | "update";
  product?: IProduct;
}

export function ModalProduct({
  close,
  open,
  onSubmit,
  modalType = "create",
  product,
}: IModalProduct) {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProductCreate>({ resolver: zodResolver(productSchema) });

  const onFinish = (data: IProductCreate) => {
    onSubmit(data);
    reset();
  };

  React.useEffect(() => {
    if (product && modalType === "update") {
      for (const k in product) {
        const key = k as keyof IProduct;

        setValue(key as any, product[key]);
      }
    }
  }, [product, modalType]);

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
          onSubmit={handleSubmit(onFinish)}
        >
          <Input
            label="Nome: "
            placeholder="Digite o nome"
            {...register("name")}
            errors={errors}
          />

          <Select
            label="Tipo: "
            {...register("type")}
            options={[
              { label: "Perecivel", value: "perishable" },
              { label: "Não perecivel", value: "not_perishable" },
            ]}
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

            <Input
              label="Peso: "
              placeholder="Digite o peso"
              {...register("weight")}
              errors={errors}
            />
          </div>

          <Textarea
            label="Descrição: "
            placeholder="Digite uma descrição"
            {...register("description")}
            errors={errors}
          />

          <Button
            type="submit"
            text={`${modalType === "create" ? "Doar" : "Atualizar"} produto`}
            className="w-full mt-4 bg-black text-white"
          />
        </form>
      </div>
    </Modal>
  );
}
