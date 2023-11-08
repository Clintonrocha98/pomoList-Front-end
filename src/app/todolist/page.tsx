"use client";
import RenderTasks from "@/components/Tasks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/service/createTask";
import { getAllTasks } from "@/service/getAllTasks";
import { taskData } from "@/types";
import { getCookie } from "cookies-next";
import { ChangeEvent, useEffect, useState } from "react";

const TodoList = () => {
  const userId = getCookie("userId");

  const [taskData, setTaskDataSubmit] = useState<taskData>({
    title: "",
    description: "",
    isFinished: false,
    userId: userId ?? "",
  });
  const [newTask, setNewTask] = useState<taskData[]>([]);

  const fetchTasks = async () => {
    if (userId) {
      try {
        const allTasks = await getAllTasks({ userId });
        if (allTasks) {
          setNewTask(allTasks);
        }
      } catch (error) {
        console.error("Erro ao buscar os itens do servidor", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createTask(taskData);
      const updatedNewTask =
        newTask.length === 0 ? [response] : [...newTask, response];
      setNewTask(updatedNewTask);
      setTaskDataSubmit({
        title: "",
        description: "",
        isFinished: false,
        userId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTaskDataSubmit({ ...taskData, [name]: value });
  };

  return (
    <section>
      <Card className="w-[320px] m-auto">
        <CardHeader>
          <CardTitle>Criar tarefa</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 gap-1">
                <Label htmlFor="title">Titulo da tarefa</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={taskData.title}
                  placeholder="Em que você está trabalhando?"
                  onChange={handleInputChange}
                />

                <Textarea
                  required
                  name="description"
                  placeholder="Descricão."
                  value={taskData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button className="w-40">Salvar</Button>
          </CardFooter>
        </form>
      </Card>
      <RenderTasks tasks={newTask} setNewTask={setNewTask} />
    </section>
  );
};
export default TodoList;
