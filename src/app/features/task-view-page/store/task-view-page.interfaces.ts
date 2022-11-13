import { Task } from 'src/app/shared/interfaces/task.interface';

export interface TaskStateInterface {
  backEndErrors: boolean | null;
  commentBackEndErrors: boolean | null;
  isLoading: boolean | null;
  task: Task | null | undefined;
}
