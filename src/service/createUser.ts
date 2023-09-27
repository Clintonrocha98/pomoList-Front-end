import { SignupForm } from "@/utils/zod";

import axiosApi from "./axiosApi";

export async function createUser(value: SignupForm): Promise<boolean | string> {
  try {
    const response = await axiosApi.post("/createUser", value);
    if (response.data.error) {
      throw new Error("usuario invalido");
    }
    return true;
  } catch (error) {
    console.error(error);
    return "Ocorreu um erro ao criar o usuário.";
  }
}
