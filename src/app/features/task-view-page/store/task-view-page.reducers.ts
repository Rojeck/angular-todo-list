import { createReducer, on } from '@ngrx/store';

import {
  getTaskAction,
  getTaskFailureAction,
  getTaskSuccessAction,
  postCommentAction,
  postCommentFailureAction,
} from './task-view-page.actions';
import { TaskStateInterface } from './task-view-page.interfaces';

const initialState: TaskStateInterface = {
  backEndErrors: false,
  commentBackEndErrors: null,
  isLoading: null,
  task: null,
};

export const taskReducer = createReducer(
  initialState,

  on(getTaskAction, (state: TaskStateInterface) => ({
    ...state,
    isLoading: true,
    backEndErrors: false,
  })),
  on(getTaskSuccessAction, (state: TaskStateInterface, action) => ({
    ...state,
    isLoading: false,
    task: action.task,
  })),
  on(getTaskFailureAction, (state: TaskStateInterface) => ({
    ...state,
    isLoading: false,
    backEndErrors: true,
  })),
  on(postCommentFailureAction, (state: TaskStateInterface) => ({
    ...state,
    commentBackEndErrors: true,
  })),
  on(postCommentAction, (state: TaskStateInterface) => ({
    ...state,
    commentBackEndErrors: false,
  }))
);
