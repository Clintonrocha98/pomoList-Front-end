import { typeBodyTasks } from "@/types";
import axiosApi from "./axiosApi";

export async function getAllTasks(userId: any): Promise<typeBodyTasks | any> {
  try {
    const response = await axiosApi.get("/tasks", userId);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
