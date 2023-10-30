import { taskData } from "@/types";
import axiosApi from "./axiosApi";
type userId = {
  userId: String;
};
export async function getAllTasks({ userId }: userId): Promise<taskData | any> {
  try {
    const response = await axiosApi.get(`/tasks/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
