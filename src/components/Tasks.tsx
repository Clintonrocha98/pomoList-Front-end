import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { deleteTask } from "@/service/deleteTask";
import { typeBodyTasks } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { MoreVertical } from "lucide-react";

type AllTasksProps = {
  tasks: typeBodyTasks[];
  setNewTask: Dispatch<SetStateAction<typeBodyTasks[]>>;
};
export default function RenderTasks({ tasks, setNewTask }: AllTasksProps) {
  async function handleDelete(task: typeBodyTasks) {
    const taskId = task.id;
    const userId = task.userId;

    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      const updatedTasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1),
      ];

      setNewTask(updatedTasks);

      await deleteTask({ taskId, userId });
    }
  }
  if (!tasks) {
    return null;
  }
  return (
    <div>
      {tasks.map((task: typeBodyTasks) => (
        <Alert key={task.id} className="w-[320px] m-auto flex justify-between">
          <div>
            <AlertTitle>{task.title}</AlertTitle>
            <AlertDescription>{task.description}</AlertDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuItem
                onClick={() => handleDelete(task)}
                className="cursor-pointer"
              >
                Apagar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Alert>
      ))}
    </div>
  );
}
