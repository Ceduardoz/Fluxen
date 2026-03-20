import { z } from "zod";

export const transactionsSchemas = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),

  amount: z
    .number()
    .positive("O valor deve ser maior que zero")
    .refine(
      (val) => Number.isFinite(val) && Math.round(val * 100) === val * 100,
      {
        message: "Máximo de 2 casas decimais",
      },
    ),

  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),

  date: z.coerce.date(),

  accountId: z.number().int().positive("Conta obrigatória"),

  toAccountId: z.number().int().positive().optional(),

  categoryId: z.number().int().positive().optional(),
});
