import moment from "moment";
import z from "zod";

export type PersonalInfosInterface = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  birthDate: string;
  phone: string;
  isDonor: boolean;
  isCoordinator: boolean;
};

function isAdult(birthDateString: string) {
  const birthDate = moment(birthDateString, "YYYY-MM-DD");
  const currentDate = moment();
  const age = currentDate.diff(birthDate, "years");
  return age >= 18;
}

function isYearInRange(dateString: string) {
  const date = moment(dateString, "YYYY-MM-DD", true);

  if (!date.isValid()) {
    return false;
  }

  const year = date.year();
  const currentYear = moment().year();

  return year >= 1900 && year <= currentYear;
}

export const PersonalInfosSchema = z
  .object({
    name: z.string().min(1, { message: "Nome vazio" }),
    email: z
      .string()
      .min(1, { message: "Email vazio" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(1, { message: "Senha vazia" })
      .min(8, { message: "Sua senha deve conter no mínimo 8 caracteres" })
      .max(50, { message: "Sua senha deve conter no máximo 50 caracteres" }),
    confirm: z.string().min(1, { message: "Confirmação vazia" }),
    birthDate: z
      .string()
      .min(1, { message: "Data vazia ou incompleta" })
      .pipe(
        z
          .string()
          .date("Data inválida")
          .refine((data) => isYearInRange(data), { message: "Data inválida" })
      )
      .refine((data) => isAdult(data), { message: "Você deve ser adulto" }),
    phone: z
      .string()
      .min(1, { message: "Telefone vazio" })
      .min(14, { message: "Telefone Invalido" })
      .max(15, { message: "Telefone Invalido" }),
    isDonor: z.boolean(),
    isCoordinator: z.boolean()
  })
  .refine(
    ({ password, confirm }) => {
      return password === confirm;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirm"],
    }
  );


