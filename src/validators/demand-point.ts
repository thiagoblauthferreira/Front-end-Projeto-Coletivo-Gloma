import { z } from "zod";
import { addressSchema } from "./address.validator";

export const demandPointSchema = z.object({
  shelterId: z.string().min(1, "O ID do abrigo é obrigatório"),
  collectionDate: z.string().min(1, "A data da coleta é obrigatória"),
  collectPoint: addressSchema,
});


export const demandPointSchemaUpdate = z.object({
  shelterId: z.string().min(1, "O ID do abrigo é obrigatório").optional(),
  collectionDate: z.string().min(1, "A data da coleta é obrigatória").optional(),
  collectPoint: addressSchema,
});