import { LoginForm } from "@/utils/zod";
import axiosApi from "./axiosApi";

export async function signInRequest(data: LoginForm) {
  try {
    const response = await axiosApi.post("/login", data);
    if (response.data.error) {
      throw new Error("usuario invalido");
    }
    
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
