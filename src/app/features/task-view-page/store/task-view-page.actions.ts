import { createAction, props } from '@ngrx/store';
import { Comment, Task } from 'src/app/shared/interfaces/task.interface';
import { commentRequest } from '../types/comment.interface';

export const getTaskAction = createAction(
  '[TASK] Get task action',
  props<{ dashboardId: string; taskId: string }>()
);
export const getTaskSuccessAction = createAction(
  '[TASK] Get task success action',
  props<{ task: Task | undefined }>()
);
export const getTaskFailureAction = createAction(
  '[TASK] Get task failure action'
);

export const postCommentAction = createAction(
  '[TASK] Post comment action',
  props<{ dashboardId: string; taskId: string; data: commentRequest }>()
);
export const postCommentSuccessAction = createAction(
  '[TASK] Post comment success action',
  props<{ dashboardId: string; taskId: string }>()
);
export const postCommentFailureAction = createAction(
  '[TASK] Post comment failure action'
);

export const deleteCommentAction = createAction(
  '[TASK] Delete comment action',
  props<{ dashboardId: string; taskId: string; commentId: string }>()
);
export const deleteCommentSuccessAction = createAction(
  '[TASK] Delete comment success action',
  props<{ dashboardId: string; taskId: string }>()
);
export const deleteCommentFailureAction = createAction(
  '[TASK] Delete comment failure action'
);
