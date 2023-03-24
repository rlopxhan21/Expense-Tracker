import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  fname: z.string(),
  lname: z.string(),
  password: z.string(),
  password2: z.string(),
});

export type RegisterSchemaDataType = z.infer<typeof schema>;
