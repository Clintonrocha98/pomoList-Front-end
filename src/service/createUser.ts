import { SignupForm } from "@/utils/zod";

import axiosApi from "./axiosApi";

export async function createUser(data: SignupForm): Promise<boolean> {
  try {
    const response = await axiosApi.post("/createUser", data);
    if (response.data.error) {
      throw new Error("usuario invalido");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
