import { z } from "zod";

export const zodLoginSchema = z.object({
  email: z.string().email("Insira um endereço de e-mail válido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type LoginForm = z.infer<typeof zodLoginSchema>;
