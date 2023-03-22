import { z } from "zod";

export const schema = z.object({
  desc: z.string(),
  amount: z.string(),
  date: z.string(),
  expense_income: z.string(),
});

export type FormInputs = z.infer<typeof schema>;
