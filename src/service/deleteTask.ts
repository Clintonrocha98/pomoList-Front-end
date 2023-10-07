import { AxiosRequestConfig } from "axios";
import axiosApi from "./axiosApi";

type typeIds = {
  taskId: string;
  userId: string;
};

export async function deleteTask({
  taskId,
  userId,
}: typeIds): Promise<boolean> {
  try {
    await axiosApi.delete("/deleteTask", {
      data: { id: taskId, userId: userId },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
