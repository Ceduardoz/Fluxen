import { z } from "zod";

export const transactionsSchemas = z.object({
  title: z.string().min(1, "Título obrigatório"),

  description: z.string().optional(),

  amount: z.coerce
    .number({
      required_error: "Valor obrigatório",
      invalid_type_error: "Valor obrigatório",
    })
    .positive("O valor deve ser maior que zero")
    .refine(
      (val) => Number.isFinite(val) && Math.round(val * 100) === val * 100,
      {
        message: "Máximo de 2 casas decimais",
      },
    ),

  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"], {
    errorMap: () => ({ message: "Tipo obrigatório" }),
  }),

  date: z
    .string()
    .min(1, "Data deve ser obrigatória")
    .refine((value) => !isNaN(new Date(value).getTime()), {
      message: "Data inválida",
    }),

  accountId: z.coerce
    .number({
      required_error: "Conta obrigatória",
      invalid_type_error: "Conta obrigatória",
    })
    .int()
    .positive("Conta obrigatória"),

  toAccountId: z.coerce.number().int().positive().optional(),

  categoryId: z.coerce
    .number({
      invalid_type_error: "Selecione uma categoria",
    })
    .int()
    .positive("Selecione uma categoria")
    .optional(),
});

export const updateTransactionSchema = z.object({
  title: z.string().min(1, "Título obrigatório").optional(),

  description: z.string().optional(),

  amount: z.coerce
    .number({
      invalid_type_error: "Valor inválido",
    })
    .positive("O valor deve ser maior que zero")
    .refine(
      (val) => Number.isFinite(val) && Math.round(val * 100) === val * 100,
      {
        message: "Máximo de 2 casas decimais",
      },
    )
    .optional(),

  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).optional(),

  date: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return !isNaN(new Date(value).getTime());
      },
      {
        message: "Data inválida",
      },
    ),

  accountId: z.coerce
    .number({
      required_error: "Conta obrigatória",
      invalid_type_error: "Conta obrigatória",
    })
    .min(1, "Conta obrigatória"),

  categoryId: z.coerce
    .number({
      required_error: "Selecione uma categoria",
      invalid_type_error: "Selecione uma categoria",
    })
    .min(1, "Selecione uma categoria"),
});
