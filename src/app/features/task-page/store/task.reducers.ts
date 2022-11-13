import { createReducer, on } from '@ngrx/store';
import {
  actionsWithTaskEditAction,
  actionsWithTaskPostAction,
  actionsWithTaskSuccessAction,
  changeContainerColorAction,
  changeContainerColorFailureAction,
  changeTaskStatusAction,
  changeTaskStatusFailureAction,
  closeTaskCreateModalAction,
  closeTaskEditModalAction,
  getDashboardAction,
  getDashboardFailureAction,
  getDashboardSuccessAction,
  openTaskCreateModalAction,
  openTaskEditModalAction,
  sortByValueChangeAction,
  sortTasksAction,
  sortTypeValueChangeAction,
  taskDeleteAction,
} from './task.actions';

import { TasksStateInterface } from './task.interfaces';

const initialState: TasksStateInterface = {
  backEndErrors: null,
  isLoading: null,
  isTaskCreateModalOpen: false,
  isTaskEditModalOpen: false,
  changeTaskFailure: false,
  sortTypeValue: 'ASC',
  sortByValue: 'date',
  dashboard: null,
};

export const tasksReducer = createReducer(
  initialState,

  on(openTaskCreateModalAction, (state: TasksStateInterface) => ({
    ...state,
    isTaskCreateModalOpen: true,
  })),
  on(closeTaskCreateModalAction, (state: TasksStateInterface) => ({
    ...state,
    isTaskCreateModalOpen: false,
  })),
  on(actionsWithTaskPostAction, (state: TasksStateInterface) => ({
    ...state,
    isLoading: true,
    changeTaskFailure: false,
  })),
  on(actionsWithTaskEditAction, (state: TasksStateInterface) => ({
    ...state,
    isLoading: true,
    changeTaskFailure: false,
  })),
  on(actionsWithTaskSuccessAction, (state: TasksStateInterface) => ({
    ...state,
    isTaskCreateModalOpen: false,
    isTaskEditModalOpen: false,
    isLoading: false,
  })),
  on(openTaskEditModalAction, (state: TasksStateInterface) => ({
    ...state,
    isTaskEditModalOpen: true,
  })),
  on(closeTaskEditModalAction, (state: TasksStateInterface) => ({
    ...state,
    isTaskEditModalOpen: false,
  })),
  on(taskDeleteAction, (state: TasksStateInterface) => ({
    ...state,
  })),
  on(changeTaskStatusAction, (state: TasksStateInterface) => ({
    ...state,
  })),
  on(changeTaskStatusFailureAction, (state: TasksStateInterface) => ({
    ...state,
    changeTaskFailure: true,
  })),
  on(sortTypeValueChangeAction, (state: TasksStateInterface, action) => ({
    ...state,
    sortTypeValue: action.value,
  })),
  on(sortByValueChangeAction, (state: TasksStateInterface, action) => ({
    ...state,
    sortByValue: action.value,
  })),
  on(sortByValueChangeAction, (state: TasksStateInterface, action) => ({
    ...state,
    sortByValue: action.value,
  })),
  on(getDashboardAction, (state: TasksStateInterface) => ({
    ...state,
    isLoading: true,
    backEndErrors: false,
  })),
  on(getDashboardSuccessAction, (state: TasksStateInterface, action) => ({
    ...state,
    isLoading: false,
    dashboard: action.dashboard,
    backEndErrors: false,
  })),
  on(getDashboardFailureAction, (state: TasksStateInterface) => ({
    ...state,
    isLoading: false,
    backEndErrors: true,
    dashboards: null,
  })),
  on(sortTasksAction, (state: TasksStateInterface, action) => ({
    ...state,
    dashboard: action.dashboard,
  })),
  on(changeContainerColorAction, (state: TasksStateInterface) => ({
    ...state,
    backEndErrors: false,
  })),
  on(changeContainerColorFailureAction, (state: TasksStateInterface) => ({
    ...state,
    backEndErrors: true,
  }))
);
