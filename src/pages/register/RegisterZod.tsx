import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email({ message: "Email not valid!" }),
    fname: z
      .string()
      .min(1, { message: "Must be more than a character long!" }),
    lname: z
      .string()
      .min(1, { message: "Must be more than a character long!" }),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        "Must contain at least one small letter, one capital letter and one numeric character.",
    }),
    password2: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
      message:
        "Must contain at least one small letter, one capital letter and one numeric character.",
    }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Password do not match!",
    path: ["password2"],
  });

export type RegisterSchemaDataType = z.infer<typeof schema>;
