import { z } from "zod";

const productValues = [
  "perishable",
  "non_perishable",
  "electronics",
  "t_shirt",
  "jacket",
  "pants",
  "footwear",
  "underwear",
  "socks",
  "towel",
  "sheet",
  "mattress",
  "blanket",
  "pencil",
  "pen",
  "eraser",
  "backpack",
  "toy",
  "bag",
  "soap",
  "shampoo",
  "conditioner",
  "toothpaste",
  "toothbrush",
  "dental_floss",
  "toilet_paper",
  "deodorant",
  "detergent",
  "laundry_cleaning_products",
  "general_cleaning_products",
  "hat",
  "gloves",
  "scarf",
  "plate",
  "cutlery",
  "glass",
  "pillow",
  "pillowcase",
  "other"
] as const;
export const productSchema = z.object({
  name: z.string().min(1, "O campo Nome é obrigatório."),
  type: z.enum(productValues, { message: "É necessário passar um valor válido." }),
  quantity: z.string().min(1, "O campo Quantidade é obrigatório."),
  weight: z.string().optional(),
  description: z.string().min(1, "O campo Descrição é obrigatório."),
}).superRefine((data, ctx) => {
 
  if (data.type === "non_perishable" || data.type === "perishable") {
    if (!data.weight || parseFloat(data.weight) <= 0) {
      ctx.addIssue({
        path: ["weight"],
        message: "O peso é obrigatório para produtos não perecíveis e deve ser um número positivo.",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});
