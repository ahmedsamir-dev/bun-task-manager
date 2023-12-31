import { ITaskService, ITask } from "./tasks.types";
import { TaskModel } from "./tasks.model";
export default class TasksService implements ITaskService {
  async getTasks(paginationParam: {
    page?: number;
    limit?: number;
  }): Promise<{ tasks: ITask[]; pagination: any }> {
    const options = {
      ...paginationParam,
      customLabels: {
        docs: "tasks",
      },
    };

    const paginationResult = await TaskModel.paginate({}, options);

    const { tasks, ...pagination } = paginationResult;

    //@ts-ignore
    return { tasks, pagination };
  }
  async getTask(id: string): Promise<ITask | null> {
    try {
      return await TaskModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async createTask(task: ITask): Promise<ITask> {
    try {
      return await new TaskModel(task).save();
    } catch (error) {
      throw error;
    }
  }
  async updateTask(id: string, task: ITask): Promise<ITask | null> {
    try {
      return await TaskModel.findByIdAndUpdate(id, task, { new: true });
    } catch (error) {
      throw error;
    }
  }
  async deleteTask(id: string): Promise<any> {
    try {
      return await TaskModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
