import { Elysia } from "elysia";
import { type ITaskService } from "@/modules/tasks/tasks.types";
import {
  createTaskValidation,
  getTaskValidation,
  getAllTasksValidation,
  updateTaskValidation,
} from "@/modules/tasks/tasks.validations";

export default function tasksController(tasksService: ITaskService) {
  return (app: Elysia) => {
    app.get(
      `/api/v1/tasks/`,
      async ({ set, query }) => {
        try {
          const tasks = await tasksService.getTasks({
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
          });

          set.status = 200;
          return {
            message: "Tasks retrieved successfully",
            ...tasks,
          };
        } catch (error) {
          set.status = 500;
          return {
            error: {
              message: "Internal server error",
            },
          };
        }
      },
      getAllTasksValidation,
    );

    app.post(
      `/api/v1/tasks/`,
      async ({ set, body }) => {
        try {
          const task = await tasksService.createTask(body);
          set.status = 201;

          return {
            message: "Task created successfully",
            task,
          };
        } catch (error) {
          set.status = 500;
          return {
            error: {
              message: "Internal server error",
            },
          };
        }
      },
      createTaskValidation,
    );

    app.get(
      `/api/v1/tasks/:id`,
      async ({ set, params: { id } }) => {
        try {
          const task = await tasksService.getTask(id);

          if (!task) {
            set.status = 404;
            return {
              error: {
                message: "Task not found",
              },
            };
          }

          set.status = 200;
          return {
            message: "Task retrieved successfully",
            task,
          };
        } catch (error) {
          set.status = 500;
          return {
            error: {
              message: "Internal server error",
            },
          };
        }
      },
      getTaskValidation,
    );

    app.put(
      "/api/v1/tasks/:id",
      async ({ set, params: { id }, body }) => {
        try {
          const task = await tasksService.updateTask(id, body);

          if (!task) {
            set.status = 404;
            return {
              error: {
                message: "Task not found",
              },
            };
          }

          set.status = 200;
          return {
            message: "Task updated successfully",
            task,
          };
        } catch (error) {
          set.status = 500;
          return {
            error: {
              message: "Internal server error",
            },
          };
        }
      },
      updateTaskValidation,
    );

    app.delete(`/api/v1/tasks/:id`, async ({ set, params: { id } }) => {
      try {
        const task = await tasksService.deleteTask(id);

        if (!task) {
          set.status = 404;
          return {
            error: {
              message: "Task not found",
            },
          };
        }

        set.status = 204;
        return {};
      } catch (error) {
        set.status = 500;
        return {
          error: {
            message: "Internal server error",
          },
        };
      }
    });
  };
}
