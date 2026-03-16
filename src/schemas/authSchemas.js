import { z } from "zod";

export const registerSchemas = z
  .object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "senha precisa ter 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const loginSchemas = z.object({
  email: z.string().email("Email Inválido"),
  password: z.string().min(8, "Senha precisa ter 8 caracteres"),
});
