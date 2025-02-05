import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDemandPointProvider } from "../context";
import { Button, Collapse, Input } from "../../../common";
import { ModalConfirmAction } from "../../../modals";
import { zipCodeMask } from "../../../../utils/masks";
import { IDeleteDemandPoint, IDemandPointCreate } from "../../../../interfaces/demand-point";
import { useAuthProvider } from "../../../../context/Auth";
import { demandPointSchemaUpdate } from "../../../../validators/demand-point";
import { dataDemandPoint } from "../util/normalizeDemandPointAddres";

const defaultStyleBtnCollapse =
  "py-4 border-b border-solid border-black font-bold text-base";

export function TabDemandPointSettings() {
  const { id = "" } = useParams();
  const { currentUser } = useAuthProvider()
  const {
    demandPoint,
    openModalConfirmActionDP,
    handleDeleteDemandPoint,
    handleUpdateDemandPoint,
    setOpenModalConfirmActionDP,
  } = useDemandPointProvider();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IDemandPointCreate>({
    resolver: zodResolver(demandPointSchemaUpdate),
  });

  const demandPointFormat: IDemandPointCreate = dataDemandPoint(demandPoint);
  
  React.useEffect(() => {       
    for (const k in demandPointFormat) {
      const key = k as keyof IDemandPointCreate;
      if (key === "collectPoint" && demandPointFormat[key] !== null) {
        for (const sk in demandPointFormat[key]) {
          const subKey = sk as keyof IDemandPointCreate["collectPoint"];
          setValue(`${key}.${subKey}`, demandPointFormat[key][subKey]);
        }
      } else {
        setValue(key, demandPointFormat[key]);
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(handleUpdateDemandPoint)}>
      <div className="my-5">
        <Collapse
          defaultIsOpen
          buttonArrow={{ className: "!top-3" }}
          btnCollapseChildren={
            <p className={`${defaultStyleBtnCollapse} pt-0`}>Ponto de demanda</p>
          }
        >
          <div
            className={`
              grid grid-cols-1 gap-4 py-3
              md:grid-cols-2
            `}
          >
            <div className="h-60 w-full rounded-2xl bg-slate-600"></div>
            <div className="grid gap-4 grid-rows-2">             
            <Input
              label="Data da demanda:"  
              {...register("collectionDate")}
              errors={errors}     
              type="datetime-local"   
              />
          </div>
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
              {...register("collectPoint.cep")}
              mask={zipCodeMask}
              errors={errors}
            />
            <Input
              label="Estado: "
              placeholder="Digite o estado"
              {...register("collectPoint.estado")}
              errors={errors}
            />
            <Input
              label="País: "
              placeholder="Digite o país"
              {...register("collectPoint.pais")}
              errors={errors}
            />
            <Input
              label="Município: "
              placeholder="Digite o município"
              {...register("collectPoint.municipio")}
              errors={errors}
            />
            <Input
              label="Bairro: "
              placeholder="Digite o bairro"
              {...register("collectPoint.bairro")}
              errors={errors}
            />
            <Input
              label="Logradouro: "
              placeholder="Digite o logradouro"
              {...register("collectPoint.logradouro")}
              errors={errors}
            />
            <Input
              label="Número: "
              placeholder="Digite o número"
              {...register("collectPoint.numero")}
              errors={errors}
            />
            <Input
              label="Complemento: "
              placeholder="Digite o complemento"
              {...register("collectPoint.complemento")}
              errors={errors}
            />
          </div>
        </Collapse>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Button
            type="submit"
            text="Atualizar ponto de demanda"
            className="w-full mt-4 bg-black text-white col-span-1 md:col-span-2"
          />

          <Button
            type="button"
            text="Excluir ponto de demanda"
            className="w-full mt-4 bg-red-500 text-white"
            onClick={() => setOpenModalConfirmActionDP(true)}
          />
        </div>
      </div>

      <ModalConfirmAction
        title="Tem certeza que deseja excluir esse ponto de demanda?"
        open={openModalConfirmActionDP}
        close={() => setOpenModalConfirmActionDP(false)}
        onSubmit={() => handleDeleteDemandPoint(id, currentUser!?.id as unknown as IDeleteDemandPoint)}
      >
        <p className="mt-4 text-base font-medium text-center">
          Ao confirmar esta ação, todas as referências ao ponto de demanda serão apagados.
        </p>
      </ModalConfirmAction>
    </form>
  );
}
