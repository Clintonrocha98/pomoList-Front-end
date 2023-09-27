import { z } from "zod";

export const zodSignupSchema = z.object({
    email: z.string().email("Insira um endereço de e-mail válido"),
    name: z.string(),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type SignupForm = z.infer<typeof zodSignupSchema>;
