"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import { TypeInputSignupError } from "@/types";
import { SignupForm, zodSignupSchema } from "@/utils/zod";
import { z } from "zod";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { AlertError } from "@/components/AlertError";
import { createUser } from "@/service/createUser";
import { useToast } from "@/components/ui/use-toast";


const SignupPage = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] =
    useState<TypeInputSignupError | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      zodSignupSchema.parse(formValues);
      setValidationErrors({});
      const result = await createUser(formValues);

      if (result === true) {
        toast({
          description: "Usuário criado com sucesso!",
        });
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          description: result,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((validationError) => {
          fieldErrors[validationError.path[0]] = validationError.message;
        });
        setValidationErrors(fieldErrors);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <section className="flex items-center justify-center min-h-screen-64">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Olá!</CardTitle>
          <CardDescription>Crie sua conta.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="fulano de tal"
                  required
                  onChange={handleInputChange}
                  name="name"
                />
                {validationErrors && validationErrors.name && (
                  <AlertError>{validationErrors.name}</AlertError>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  required
                  value={formValues?.email}
                  onChange={handleInputChange}
                  name="email"
                />
                {validationErrors && validationErrors.email && (
                  <AlertError>{validationErrors.email}</AlertError>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  required
                  name="password"
                  onChange={handleInputChange}
                />
                {validationErrors && validationErrors.password && (
                  <AlertError>{validationErrors.password}</AlertError>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
export default SignupPage;
