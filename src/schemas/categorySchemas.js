import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "O nome da categoria é obrigatório"),

  categoryType: z.enum(["INCOME", "EXPENSE"], {
    errorMap: () => ({ message: "Selecione se é uma Receita ou Despesa" }),
  }),

  color: z.string().optional(),
  icon: z.string().optional(),
});

export const updateCategorySchema = categorySchema.partial();
