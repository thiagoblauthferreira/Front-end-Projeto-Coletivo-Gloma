import { FieldError, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Estados } from "./utils/Estados";
import { AdressInterface, AdressSchema } from "./utils/adress.zod.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldConstructor } from "../../../../components/FormField";
import { SelectInput } from "../../../../components/SelectInput";
import { handleCEP } from "./utils/handleCEP";
import { zipCodeMask } from "./utils/validations";

interface AdressProps {
  steps: {
    setCurrent: Dispatch<SetStateAction<number>>;
    current: number;
  };

  form: {
    setValues: Function;
    values: any;
  };
  submitForm: false | Function;
}

function AdressStep({ steps, form }: AdressProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<AdressInterface>({
    resolver: zodResolver(AdressSchema),
    mode: "onSubmit",
  });

  const [adress, setAdress] = useState<Record<string, string> | null>(null);

  async function onSubmit(data: AdressInterface) {
    form.setValues({ endereco: data }, "submit");
  }

  const cepMask: string = watch("CEP");

  useEffect(() => {
    setValue("CEP", zipCodeMask(cepMask));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepMask]);

  if (adress) {
    for (let info in adress) {
      setValue(info as any, adress[info])
    }
  }

  const FormField = FormFieldConstructor<AdressInterface>();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center"
    >
      <h1 className="text-3xl uppercase pb-5 text-center bold">Endereço</h1>
      <FormField
        error={errors?.CEP}
        register={register}
        setError={setError}
        name="CEP"
        inputProps={{
          type: "text",
          placeholder: "xxxxx-xxx",
          maxLength: 9,
          onBlur: (e) => {
            trigger("CEP");
            handleCEP(e, setAdress);
          },
        }}
      />
      <div className="grid grid-cols-4 gap-1">
        <FormField
          name="localidade"
          error={adress?.localidade ? undefined : errors?.localidade}
          register={register}
          setError={setError}
          containerClassName="col-span-3"
          inputProps={{
            type: "text",
            placeholder: "Cidade",
          }}
        />
        <SelectInput
          register={register}
          setError={setError}
          name="uf"
          items={Estados}
          className="col-span-1"
          error={
            adress?.uf ? undefined : (errors?.uf as FieldError | undefined)
          }
        />
      </div>
      <FormField
        name="bairro"
        error={adress?.bairro ? undefined : errors?.bairro}
        register={register}
        setError={setError}
        inputProps={{
          type: "text",
          placeholder: "Bairro",
        }}
      />
      <div className="grid grid-cols-4 gap-1">
        <FormField
          error={adress?.logradouro ? undefined : errors?.logradouro}
          register={register}
          setError={setError}
          name="logradouro"
          containerClassName="col-span-3"
          inputProps={{
            type: "text",
            placeholder: "logradouro",
          }}
        />
        <FormField
          name="numero"
          error={errors?.numero}
          register={register}
          setError={setError}
          inputClassName="col-span-1 noArrow"
          inputProps={{
            type: "number",
            placeholder: "Nº",
          }}
        />
      </div>
      <div className="w-full">
        <label className="label w-full">
          <span className="label-text uppercase">Complemento</span>
        </label>
        <textarea
          placeholder="Complemento..."
          {...register("complemento")}
          className="w-full textarea textarea-bordered max-h-24"
        />
      </div>
      <button className="mx-auto mt-5 btn btn-primary w-2/3">
        Cadastrar-se
      </button>
    </form>
  );
}

export default AdressStep;
