import { z } from "zod";

export const transactionsSchemas = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  amount: z.coerce
    .number()
    .positive("O valor deve ser maior que zero")
    .refine(
      (val) => Number.isFinite(val) && Math.round(val * 100) === val * 100,
      {
        message: "Máximo de 2 casas decimais",
      },
    ),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
  date: z.coerce.date("Data deve ser obrigatória"),
  accountId: z.coerce
    .number({ invalid_type_error: "Conta obrigatória" })
    .int()
    .positive("Conta obrigatória"),
  toAccountId: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce
    .number()
    .int()
    .positive("Selecione uma categoria")
    .optional(),
});

export const updateTransactionSchema = z.object({
  title: z.string().min(1, "Título obrigatório").optional(),
  description: z.string().optional(),
  amount: z.coerce
    .number()
    .positive("O valor deve ser maior que zero")
    .refine(
      (val) => Number.isFinite(val) && Math.round(val * 100) === val * 100,
      {
        message: "Máximo de 2 casas decimais",
      },
    )
    .optional(),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).optional(),
  date: z.coerce.date().optional(),
  accountId: z.coerce.number().int().positive("Conta obrigatória").optional(),
  toAccountId: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
});
