import tasksController from "@/modules/tasks/tasks.controller";
import TasksService from "@/modules/tasks/tasks.service";

export const controllers = [tasksController(new TasksService())];
