import { taskData, typeBodyTasks } from "@/types";
import axiosApi from "./axiosApi";

export async function createTask({
  title,
  description,
  isFinished,
  userId,
}: taskData) {
  try {
    const response = await axiosApi.post("/createTask", {
      title,
      description,
      isFinished,
      userId,
    });

    return response.data.newTask;
  } catch (error) {
    console.error(error);
    return error;
  }
}
