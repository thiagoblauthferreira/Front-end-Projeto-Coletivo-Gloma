import { z } from "zod";
import { Veiculos } from "./Veiculos";

export type VehiclesInterface = {
    //veiculos
    veiculos: string[];
};

export const VehiclesSchema = z.object({
    veiculos: z.enum(Veiculos, { message: "Valor inválido" }),
});
