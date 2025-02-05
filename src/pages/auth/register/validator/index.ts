import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Nome vazio" }),
    username: z.string().min(1, { message: "Nome de usuario vazio" }),
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
    isCoordinator: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "A confirmação de senha não coincide com a senha",
    path: ["confirm"],
  });
