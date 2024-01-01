export interface ITask {
  uuid?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  dueDate?: string;
}

export interface ITaskService {
  getTasks(pagination: {
    page?: number;
    limit?: number;
  }): Promise<{ tasks: ITask[]; pagination: any }>;
  getTask(id: string): Promise<ITask | null>;
  createTask(task: ITask): Promise<ITask>;
  updateTask(id: string, task: ITask): Promise<ITask | null>;
  deleteTask(id: string): Promise<ITask>;
}
