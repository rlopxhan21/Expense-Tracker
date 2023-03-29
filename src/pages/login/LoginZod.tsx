import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Email not valid!" }),
  password: z.string().min(6, { message: "Must be atleast 6 character long." }),
});

export type LoginFornInputsInferDataType = z.infer<typeof schema>;
