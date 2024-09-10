import z from "zod";
import { EnumType } from "typescript";
import {
  Estados,
  EstadosEnum,
} from "../../pages/auth/register/SignUpSteps/Adress/utils/Estados";

export type AdressInterface = {
  logradouro: string;
  numero: number;
  bairro: string;
  localidade: string;
  uf: EstadosEnum;
  CEP: string;
  complemento: string;
};

export const AdressSchema = z.object({
  logradouro: z
    .string()
    .min(1, { message: "Rua vazia" })
    .max(500, { message: "caracteres demais para este campo" }),
  numero: z.string().optional(),
  bairro: z
    .string()
    .max(500, { message: "caracteres demais para este campo" })
    .min(1, { message: "Bairro vazio" }),
  localidade: z.string().min(1, { message: "Bairro vazio" }),
  uf: z.enum(Estados, { message: "Valor inválido" }),
  CEP: z
    .string()
    .min(1, { message: "CEP vazio" })
    .min(8, { message: "CEP inválido" })
    .max(9, { message: "CEP inválido" }),
  complemento: z.string().optional(),
});
