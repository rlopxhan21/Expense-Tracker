import { z } from "zod";

export const schema = z.object({
  desc: z.string().min(1, { message: "Fields empty!" }),
  amount: z.string().min(1, { message: "Fields empty!" }),
  date: z.string().min(1, { message: "Fields empty!" }),
  // .transform((value) => new Date(value))
  // .refine(
  //   (value) => {
  //     return !isNaN(value.getTime());
  //   },
  //   {
  //     message: "Invalid Date Formate",
  //   }
  // )
  // .nullable(),
});

export type FormInputs = z.infer<typeof schema>;
