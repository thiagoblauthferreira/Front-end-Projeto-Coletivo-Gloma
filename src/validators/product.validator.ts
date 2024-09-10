import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O campo Nome é obrigatório."),
  type: z.enum(["perishable", "not_perishable"], { message: "Valor inválido" }),
  quantity: z.string().min(1, "O campo Quantidade é obrigatório."),
  weight: z.string().min(1, "O campo Peso é obrigatório."),
  description: z.string().min(1, "O Descrição Nome é obrigatório."),
});
