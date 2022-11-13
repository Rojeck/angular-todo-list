export interface Task {
  name: string;
  description?: string;
  created_at: Date;
  status: iStatus;
  _id: string;
  comments: Comment[];
}
export interface Comment {
  _id: string;
  text: string;
  created_at: Date;
}

export interface TaskRequest {
  name: string;
  description?: string;
  status: iStatus;
}

export interface TaskEditRequest {
  name: string;
  description?: string;
}

export interface TaskStatusChangeRequest {
  status: iStatus;
}

export type iStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED';