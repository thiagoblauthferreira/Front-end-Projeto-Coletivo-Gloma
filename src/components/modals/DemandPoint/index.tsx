import { useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "../../common";
import { distributionPointSchema } from "../../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabAddress } from "./Tabs/Address";
import { IDemandPointCreate } from "../../../interfaces/demand-point";
import { TabDemandPoint } from "./Tabs/DemandPoint";
import { demandPointSchema } from "../../../validators/demand-point";

interface IDemandPoint {
  close: () => void;
  open: boolean;
  onSubmit: (data: IDemandPointCreate) => void;
}

export function ModalDemandPoint({ close, open, onSubmit }: IDemandPoint) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDemandPointCreate>({
    resolver: zodResolver(demandPointSchema),
  });

  return (
    <Modal
      open={open}
      close={close}
      header={
        <div className="p-4">
          <p className="font-semibold text-lg">Criar ponto de demanda</p>
        </div>
      }
    >
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            tabs={[
              {
                key: "tab_one",
                label: "Ponto de demanda",
                children: <TabDemandPoint register={register} errors={errors} />,
              },
              {
                key: "tab_two",
                label: "Endereço",
                children: <TabAddress register={register} errors={errors} />,
              },
            ]}
          />
          <Button
            type="submit"
            text="Cadastrar"
            className="w-full mt-4 bg-black text-white"
          />
        </form>
      </div>
    </Modal>
  );
}
