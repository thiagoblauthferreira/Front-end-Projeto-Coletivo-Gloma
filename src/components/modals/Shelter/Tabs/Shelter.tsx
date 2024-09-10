import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input, Textarea } from "../../../common";
import { IShelterCreate } from "../../../../interfaces/shelter";
import { phoneMask } from "../../../../utils/masks";

interface ITabShelter {
  register: UseFormRegister<IShelterCreate>;
  errors: FieldErrors<IShelterCreate>;
}

export function TabShelter({ register, errors }: ITabShelter) {
  return (
    <div
      className={`
        grid grid-flow-row auto-rows-max
        gap-2
      `}
    >
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
      <Textarea
        label="Descrição: "
        placeholder="Digite uma descrição"
        {...register("description")}
        errors={errors}
      />
    </div>
  );
}
