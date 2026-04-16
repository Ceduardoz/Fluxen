import { z } from "zod";

export const createGoalSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),

  description: z
    .string()
    .max(255, "A descrição deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),

  targetAmount: z.coerce
    .number({
      required_error: "O valor alvo é obrigatório",
      invalid_type_error: "O valor alvo deve ser um número válido",
    })
    .positive("O valor alvo deve ser maior que zero"),

  accountId: z.coerce
    .number({
      required_error: "Selecione uma conta",
      invalid_type_error: "Selecione uma conta válida",
    })
    .positive("Selecione uma conta válida"),

  color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Selecione uma cor válida"),
});

export const updateGoalSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),

  description: z
    .string()
    .max(255, "A descrição deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),

  targetAmount: z.coerce
    .number({
      required_error: "O valor alvo é obrigatório",
      invalid_type_error: "O valor alvo deve ser um número válido",
    })
    .positive("O valor alvo deve ser maior que zero"),

  color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Selecione uma cor válida"),
});
