import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskStateInterface } from './task-view-page.interfaces';

export const featureSelector =
  createFeatureSelector<TaskStateInterface>('task');

export const taskSelector = createSelector(
  featureSelector,
  (state: TaskStateInterface) => state.task
);

export const commentBackEndErrorSelector = createSelector(
  featureSelector,
  (state: TaskStateInterface) => state.commentBackEndErrors
);

export const backEndErrorSelector = createSelector(
  featureSelector,
  (state: TaskStateInterface) => state.backEndErrors
);
