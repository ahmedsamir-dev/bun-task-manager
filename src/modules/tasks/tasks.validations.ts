import { t } from "elysia";

export const createTaskValidation = {
  body: t.Object({
    title: t.String(),
    description: t.String(),
    dueDate: t.String(),
  }),
};

export const getTaskValidation = {
  params: t.Object({
    id: t.String(),
  }),
};

export const getAllTasksValidation = {
  query: t.Object({
    page: t.String(),
    limit: t.String(),
  }),
};

export const updateTaskValidation = {
  params: t.Object({
    id: t.String(),
  }),
  body: t.Object({
    title: t.Optional(t.String()),
    description: t.Optional(t.String()),
    dueDate: t.Optional(t.String()),
    completed: t.Optional(t.Boolean()),
  }),
};
