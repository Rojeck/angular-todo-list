import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksStateInterface } from './task.interfaces';

export const featureSelector =
  createFeatureSelector<TasksStateInterface>('tasks');
export const isLoadingSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.isLoading
);

export const backEndErrorsSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.backEndErrors
);

export const isTaskCreateModalOpenSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.isTaskCreateModalOpen
);

export const isTaskEditModalOpenSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.isTaskEditModalOpen
);

export const changeTaskFailureSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.changeTaskFailure
);

export const sortTypeValueSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.sortTypeValue
);
export const sortByValueSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.sortByValue
);
export const dashboardSelector = createSelector(
  featureSelector,
  (state: TasksStateInterface) => state.dashboard
);
