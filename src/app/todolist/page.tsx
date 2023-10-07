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
import { taskData, typeBodyTasks } from "@/types";
import { getCookie } from "cookies-next";
import { ChangeEvent, useEffect, useState } from "react";

const TodoList = () => {
  const userId = getCookie("userId");
  const token = getCookie("pomolist-token");
  const [taskData, setTaskDataSubmit] = useState<taskData>({
    title: "",
    description: "",
    isFinished: false,
    userId: userId,
    token: token,
  });
  const [newTask, setNewTask] = useState<typeBodyTasks[]>([]);

  const fetchTasks = async () => {
    if (userId) {
      try {
        const allTasks = await getAllTasks(userId);
        setNewTask(allTasks.tasks);
      } catch (error) {
        console.error("Erro ao buscar os itens do servidor", error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createTask(taskData);

      setNewTask([...newTask, response]);
      setTaskDataSubmit({
        title: "",
        description: "",
        isFinished: false,
        userId: userId,
        token: token,
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
                  placeholder="Em que você está trabalhando?"
                  onChange={handleInputChange}
                />

                <Textarea
                  required
                  name="description"
                  placeholder="Descricão."
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
