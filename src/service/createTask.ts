import { taskData } from "@/types";
import axiosApi from "./axiosApi";

export async function createTask({
  title,
  description,
  isFinished,
  userId,
}: taskData) {
  try {
    const response = await axiosApi.post("/createtask", {
      title,
      description,
      isFinished,
      userId,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
