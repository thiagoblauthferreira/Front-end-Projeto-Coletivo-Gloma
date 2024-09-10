import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  PersonalInfosInterface,
  PersonalInfosSchema,
} from "./utils/personalInfos.zod.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldConstructor } from "../../../../../components/common/FormField";
import { phoneMask } from "../../../../../utils/masks";

interface PersonalInfosProps {
  steps: {
    setCurrent: Dispatch<SetStateAction<number>>;
    current: number;
  };

  form: {
    setValues: Function;
    values: any;
  };
}

export function PersonalInfosStep({ steps, form }: PersonalInfosProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<PersonalInfosInterface>({
    resolver: zodResolver(PersonalInfosSchema),
    mode: "onTouched",
  });

  async function onSubmit(data: PersonalInfosInterface) {
    const adjustedData = { ...data,
      username: data.email
     };
    form.setValues(adjustedData);
    steps.setCurrent(steps.current + 1);
  }

  const FormField = FormFieldConstructor<PersonalInfosInterface>();

  const phone: string = watch("phone");

  useEffect(() => {
    setValue("phone", phoneMask(phone));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  return (
    <form className="flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl uppercase pb-5 text-center bold">Informações</h1>
      <FormField
        name="name"
        register={register}
        setError={setError}
        error={errors?.name}
        inputProps={{
          placeholder: "Seu nome",
        }}
      />
      <FormField
        name="email"
        register={register}
        setError={setError}
        error={errors?.email}
        inputProps={{
          type: "email",
          placeholder: "Seu Email",
        }}
      />
      <FormField
        name="password"
        register={register}
        setError={setError}
        error={errors?.password}
        inputProps={{
          type: "password",
          placeholder: "Sua senha",
        }}
      />
      <FormField
        name="confirm"
        register={register}
        setError={setError}
        error={errors?.confirm}
        inputProps={{
          placeholder: "Confirme sua senha",
          type: "password",
        }}
      />
      <FormField
        name="birthDate"
        register={register}
        setError={setError}
        error={errors?.birthDate}
        inputProps={{
          type: "date",
        }}
      />
      <FormField
        name="phone"
        register={register}
        setError={setError}
        error={errors?.phone}
        inputProps={{
          type: "tel",
          placeholder: "(xx) xxxxx-xxxx",
          maxLength: 15,
        }}
      />
      <label className="cursor-pointer label">
        <span className="label-text text-lg">Sou doador</span>
        <input
          {...register("isDonor")}
          type="checkbox"
          defaultChecked
          className="checkbox checkbox-accent"
        />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text text-lg">Sou coordenador de abrigo</span>
        <input
          {...register("isCoordinator")}
          type="checkbox"
          className="checkbox checkbox-accent"
        />
      </label>
      <button className="mx-auto mt-5 btn btn-primary w-2/3">Próximo</button>
    </form>
  );
}
