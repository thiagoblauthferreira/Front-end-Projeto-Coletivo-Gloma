import { useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "../../common";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabShelter } from "./Tabs/Shelter";
import { TabAddress } from "./Tabs/Address";
import { IShelterCreate } from "../../../interfaces/shelter";
import { shelterSchema } from "../../../validators";

interface IShelter {
  close: () => void;
  open: boolean;
  onSubmit: (data: IShelterCreate) => void;
}

export function ModalShelter({ close, open, onSubmit }: IShelter) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShelterCreate>({
    resolver: zodResolver(shelterSchema),
  });

  return (
    <Modal
      open={open}
      close={close}
      header={
        <div className="p-4">
          <p className="font-semibold text-lg">Criar abrigo</p>
        </div>
      }
    >
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs
            tabs={[
              {
                key: "tab_one",
                label: "Abrigo",
                children: <TabShelter register={register} errors={errors} />,
              },
              {
                key: "tab_two",
                label: "Endreço",
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
