import { LoginForm } from "@/utils/zod";
import { setCookie } from "cookies-next";
import axiosApi from "./axiosApi";

export async function createSesson(
  value: LoginForm
): Promise<string | boolean> {
  try {
    const response = await axiosApi.post("/login", value);

    if (!response.data) {
      throw new Error("usuario invalido");
    }

    setCookie("token", response.data.token);

    return true;
  } catch (error) {
    console.error(error);
    return "Ocorreu um erro.";
  }
}
