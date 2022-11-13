import { Dashboard } from '../../../shared/interfaces/dashboard.interface';
import { SortTasksValues } from '../types/tasks.types';

export interface TasksStateInterface {
  backEndErrors: boolean | null;
  isLoading: boolean | null;
  isTaskCreateModalOpen: boolean;
  isTaskEditModalOpen: boolean;
  changeTaskFailure: boolean;
  sortTypeValue: 'ASC' | 'DESC';
  sortByValue: SortTasksValues;
  dashboard: Dashboard | null;
}
