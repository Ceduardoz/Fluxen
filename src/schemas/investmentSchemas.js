import { z } from "zod";

export const createInvestmentSchema = z.object({
  name: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  institution: z.string().min(1, "Selecione uma conta"),

  type: z.enum(["CDB", "CDI", "LCI", "LCA"], {
    errorMap: () => ({ message: "Selecione um tipo de investimento" }),
  }),

  investedAmount: z.coerce
    .number({
      required_error: "O valor investido é obrigatório",
      invalid_type_error: "Digite um valor válido",
    })
    .positive("O valor investido deve ser maior que zero"),

  annualRate: z.coerce
    .number({
      required_error: "A rentabilidade é obrigatória",
      invalid_type_error: "Digite uma rentabilidade válida",
    })
    .positive("A rentabilidade deve ser maior que zero"),

  startDate: z
    .string("A data de início é obrigatória")
    .min(1, "A data de início é obrigatória")
    .refine((value) => !isNaN(new Date(value).getTime()), {
      message: "Data inválida",
    }),
});
