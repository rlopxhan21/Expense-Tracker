import { z } from "zod";

export const schema = z.object({
  desc: z.string(),
  amount: z.string(),
  date: z
    .string()
    .transform((value) => new Date(value))
    .refine(
      (value) => {
        return !isNaN(value.getTime());
      },
      {
        message: "Invalid Date Formate",
      }
    )
    .nullable(),
});

export type FormInputs = z.infer<typeof schema>;
