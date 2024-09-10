import { useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "../../common";
import { distributionPointSchema } from "../../../validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabDistribuitionPoint } from "./Tabs/DistribuitionPoint";
import { TabAddress } from "./Tabs/Address";
import { IDistribuitionPointCreate } from "../../../interfaces/distriuition-points";

interface IDistribuitionPoint {
  close: () => void;
  open: boolean;
  onSubmit: (data: IDistribuitionPointCreate) => void;
}

export function ModalDistribuitionPoint({ close, open, onSubmit }: IDistribuitionPoint) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDistribuitionPointCreate>({
    resolver: zodResolver(distributionPointSchema),
  });

  return (
    <Modal
      open={open}
      close={close}
      header={
        <div className="p-4">
          <p className="font-semibold text-lg">Criar ponto de distribuição</p>
        </div>
      }
    >
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            tabs={[
              {
                key: "tab_one",
                label: "Ponto de distribuição",
                children: <TabDistribuitionPoint register={register} errors={errors} />,
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
