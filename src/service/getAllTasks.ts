import { typeBodyTasks } from "@/types";
import axiosApi from "./axiosApi";
type userId = {
  userId: String;
};
export async function getAllTasks({
  userId,
}: userId): Promise<typeBodyTasks | any> {
  try {
    const response = await axiosApi.post("/tasks", { userId });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
