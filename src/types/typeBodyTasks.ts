export type typeBodyTasks = {
  filter(arg0: (task: { id: string; }) => boolean): unknown;
  title: string;
  description: string;
  isFinish: boolean;
  id: string;
  userId: string;
};
