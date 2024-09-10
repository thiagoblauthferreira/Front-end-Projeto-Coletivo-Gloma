import { z } from "zod";

export const addressSchema = z.object({
  cep: z
    .string({ required_error: "O campo CEP é obrigatório." })
    .min(1, "O campo CEP é obrigatório.")
    .min(8, { message: "CEP inválido" })
    .max(9, { message: "CEP inválido" }),
  estado: z
    .string({ required_error: "O campo Estado é obrigatório." })
    .min(1, "O campo Estado é obrigatório."),
  pais: z
    .string({ required_error: "O campo País é obrigatório." })
    .min(1, "O campo País é obrigatório."),
  municipio: z
    .string({ required_error: "O campo Município é obrigatório." })
    .min(1, "O campo Município é obrigatório."),
  bairro: z
    .string({ required_error: "O campo Bairro é obrigatório." })
    .min(1, "O campo Bairro é obrigatório."),
  logradouro: z
    .string({ required_error: "O campo Logradouro é obrigatório." })
    .min(1, "O campo Logradouro é obrigatório."),
  numero: z
    .string({ required_error: "O campo Número é obrigatório." })
    .min(1, "O campo Número é obrigatório."),
  complemento: z.string().optional(),
});
