import { Task } from "src/app/shared/interfaces/task.interface";

export interface Dashboard {
  name: string;
  description?: string;
  created_at: Date;
  created_by: string;
  _id: string;
  colors: ColorSchema
  tasks: Task[];
}

export interface DashboardResponce {
  name: string;
  description?: string;
  created_at: Date;
  created_by: string;
  _id: string;
  __v: number;
  colors: ColorSchema
  tasks: Task[];
}

export interface ColorSchema {
  TODO: string,
  IN_PROGRESS: string,
  DONE: string
}

export interface ActionsWithDashboardRequest {
  name: string | null;
  description?: string | null;
}
export interface ActionsWithDashboardResponce {
  message: string;
}
