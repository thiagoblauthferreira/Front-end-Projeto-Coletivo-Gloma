import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { IDistribuitionPointCreate } from "../../../../interfaces/distriuition-points";
import { distributionPointSchema } from "../../../../validators";
import { useDistribuitionPointProvider } from "../context";
import { Button, Collapse, Input, Textarea } from "../../../common";
import { ModalConfirmAction } from "../../../modals";
import { phoneMask, zipCodeMask } from "../../../../utils/masks";

const defaultStyleBtnCollapse =
  "py-4 border-b border-solid border-black font-bold text-base";

export function TabDistribuitionPointSettings() {
  const { id = "" } = useParams();
  const {
    distribuitionPoint,
    openModalConfirmActionDP,
    handleDeleteDistribuitionPoint,
    handleUpdateDistribuitionPoint,
    setOpenModalConfirmActionDP,
  } = useDistribuitionPointProvider();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IDistribuitionPointCreate>({
    resolver: zodResolver(distributionPointSchema),
  });

  React.useEffect(() => {
    for (const k in distribuitionPoint) {
      const key = k as keyof IDistribuitionPointCreate;
      if (key === "address" && distribuitionPoint[key] !== null) {
        for (const sk in distribuitionPoint[key]) {
          const subKey = sk as keyof IDistribuitionPointCreate["address"];
          setValue(`${key}.${subKey}`, distribuitionPoint[key][subKey]);
        }
      } else {
        setValue(key, distribuitionPoint[key]);
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(handleUpdateDistribuitionPoint)}>
      <div className="my-5">
        <Collapse
          defaultIsOpen
          buttonArrow={{ className: "!top-3" }}
          btnCollapseChildren={
            <p className={`${defaultStyleBtnCollapse} pt-0`}>Ponto de distribuição</p>
          }
        >
          <div
            className={`
              grid grid-cols-1 gap-4 py-3
              md:grid-cols-2
            `}
          >            
            <div className="grid gap-4 grid-rows-2">
              <Input
                label="Nome: "
                placeholder="Digite o nome"
                {...register("name")}
                errors={errors}
              />
              <Input
                label="Telefone: "
                placeholder="(xx) x-xxxx-xxx"
                {...register("phone")}
                mask={phoneMask}
                errors={errors}
              />
            </div>
            <Textarea
              label="Descrição: "
              placeholder="Digite uma descrição"
              {...register("description")}
              errors={errors}
              containerClassName="col-span-1 md:col-span-2"
            />
          </div>
        </Collapse>

        <Collapse
          defaultIsOpen
          btnCollapseChildren={<p className={`${defaultStyleBtnCollapse}`}>Endereço</p>}
        >
          <div
            className={`
              grid grid-cols-1 gap-4 py-3
              md:grid-cols-2
            `}
          >
            <Input
              label="CEP: "
              placeholder="Digite o CEP"
              {...register("address.cep")}
              mask={zipCodeMask}
              errors={errors}
            />
            <Input
              label="Estado: "
              placeholder="Digite o estado"
              {...register("address.estado")}
              errors={errors}
            />
            <Input
              label="País: "
              placeholder="Digite o país"
              {...register("address.pais")}
              errors={errors}
            />
            <Input
              label="Município: "
              placeholder="Digite o município"
              {...register("address.municipio")}
              errors={errors}
            />
            <Input
              label="Bairro: "
              placeholder="Digite o bairro"
              {...register("address.bairro")}
              errors={errors}
            />
            <Input
              label="Logradouro: "
              placeholder="Digite o logradouro"
              {...register("address.logradouro")}
              errors={errors}
            />
            <Input
              label="Número: "
              placeholder="Digite o número"
              {...register("address.numero")}
              errors={errors}
            />
            <Input
              label="Complemento: "
              placeholder="Digite o complemento"
              {...register("address.complemento")}
              errors={errors}
            />
          </div>
        </Collapse>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Button
            type="submit"
            text="Atualizar ponto de distribuição"
            className="w-full mt-4 bg-black text-white col-span-1 md:col-span-2"
          />

          <Button
            type="button"
            text="Excluir ponto de distribuição"
            className="w-full mt-4 bg-red-500 text-white"
            onClick={() => setOpenModalConfirmActionDP(true)}
          />
        </div>
      </div>
      <ModalConfirmAction
        title="Tem certeza que deseja excluir esse ponto de distribuição?"
        open={openModalConfirmActionDP}
        close={() => setOpenModalConfirmActionDP(false)}
        onSubmit={() => handleDeleteDistribuitionPoint(id)}
      >
        <p className="mt-4 text-base font-medium text-center">
          Ao confirmar esta ação, todas as referências de produtos neste ponto de
          distribuição serão removidas.
        </p>
      </ModalConfirmAction>
    </form>
  );
}
