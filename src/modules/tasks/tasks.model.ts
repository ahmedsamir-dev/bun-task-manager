import { type ITask } from "./tasks.types";
import { Document, Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface ITaskDocument extends ITask, Document {}

const TaskSchema = new Schema<ITaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
  },
  { timestamps: true },
);

TaskSchema.plugin(mongoosePaginate);

const TaskModel = model<ITaskDocument, PaginateModel<ITaskDocument>>("Tasks", TaskSchema, "tasks");

export { ITaskDocument, TaskModel };
