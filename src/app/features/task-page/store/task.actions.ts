import { createAction, props } from '@ngrx/store';
import { Dashboard } from 'src/app/shared/interfaces/dashboard.interface';
import {
  iStatus,
  TaskRequest,
  TaskStatusChangeRequest,
} from 'src/app/shared/interfaces/task.interface';
import { Color, SortTasksValues } from '../types/tasks.types';

export const openTaskCreateModalAction = createAction(
  '[TASKS] Open task create modal'
);
export const openTaskEditModalAction = createAction(
  '[TASKS] Open task edit modal'
);
export const closeTaskCreateModalAction = createAction(
  '[TASKS] Close task create modal'
);
export const closeTaskEditModalAction = createAction(
  '[TASKS] Close task create modal'
);
export const actionsWithTaskPostAction = createAction(
  '[TASKS] Create task action',
  props<{ data: TaskRequest; dashboardId: string }>()
);
export const actionsWithTaskPostFailureAction = createAction(
  '[TASKS] Create task action'
);
export const actionsWithTaskEditAction = createAction(
  '[TASKS] Edit task action',
  props<{ taskData: TaskRequest; dashboardId: string; taskId: string }>()
);
export const actionsWithTaskEditFailureAction = createAction(
  '[TASKS] Edit task failure action'
);

export const changeTaskStatusAction = createAction(
  '[TASKS] Change task status action',
  props<{
    taskData: TaskStatusChangeRequest;
    dashboardId: string;
    taskId: string;
  }>()
);

export const changeTaskStatusFailureAction = createAction(
  '[TASKS] Change task status failure action'
);

export const taskDeleteAction = createAction(
  '[TASKS] Delete task action',
  props<{ dashboardId: string; taskId: string }>()
);
export const taskDeleteFailureAction = createAction(
  '[TASKS] Delete task failure action'
);
export const actionsWithTaskSuccessAction = createAction(
  '[TASKS] Create/edit task success action',
  props<{ dashboardId: string }>()
);

export const dashboardDeleteAction = createAction(
  '[TASKS] Delete dashboard action',
  props<{ dashboardId: string }>()
);
export const dashboardDeleteFailureAction = createAction(
  '[TASKS] Delete dashboard failure action'
);
export const dashboardDeleteSuccessAction = createAction(
  '[TASKS] Delete dashboard success action'
);

export const sortByValueChangeAction = createAction(
  '[TASKS] sort by value change',
  props<{ value: SortTasksValues }>()
);
export const sortTypeValueChangeAction = createAction(
  '[TASKS] sort type value change',
  props<{ value: 'ASC' | 'DESC' }>()
);
export const sortTasksAction = createAction(
  '[TASKS] sort tasks action',
  props<{ dashboard: Dashboard | null }>()
);

export const getDashboardAction = createAction(
  '[TASKS] Get dashboard',
  props<{ dashboardId: string }>()
);
export const getDashboardSuccessAction = createAction(
  '[TASKS] Get dashboard success',
  props<{ dashboard: Dashboard }>()
);
export const getDashboardFailureAction = createAction(
  '[TASKS] Get dashboard failure'
);

export const changeContainerColorAction = createAction(
  '[TASKS] Change container color',
  props<{ dashboardId: string; containerType: iStatus; color: Color }>()
);

export const changeContainerColorFailureAction = createAction(
  '[TASKS] Change container color failure'
);
