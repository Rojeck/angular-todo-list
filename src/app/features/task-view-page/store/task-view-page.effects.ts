import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task.interface';

import { TaskViewPageService } from '../services/task-view-page.service';

import {
  deleteCommentAction,
  deleteCommentFailureAction,
  deleteCommentSuccessAction,
  getTaskAction,
  getTaskFailureAction,
  getTaskSuccessAction,
  postCommentAction,
  postCommentFailureAction,
  postCommentSuccessAction,
} from './task-view-page.actions';

@Injectable()
export class TaskViewPageEffect {
  constructor(
    private actions$: Actions,
    private taskService: TaskViewPageService
  ) {}
  getTaskEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        getTaskAction,
        postCommentSuccessAction,
        deleteCommentSuccessAction
      ),
      switchMap(({ dashboardId, taskId }) => {
        return this.taskService.getTask(dashboardId, taskId).pipe(
          map((task: Task | undefined) => getTaskSuccessAction({ task: task })),
          catchError(() => of(getTaskFailureAction()))
        );
      })
    )
  );
  postCommentAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postCommentAction),
      switchMap(({ dashboardId, taskId, data }) => {
        return this.taskService.postComment(dashboardId, taskId, data).pipe(
          map(() => postCommentSuccessAction({ dashboardId, taskId })),
          catchError(() => of(postCommentFailureAction()))
        );
      })
    )
  );
  deleteCommentAction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCommentAction),
      switchMap(({ dashboardId, taskId, commentId }) => {
        return this.taskService
          .deleteComment(dashboardId, taskId, commentId)
          .pipe(
            map(() => deleteCommentSuccessAction({ dashboardId, taskId })),
            catchError(() => of(deleteCommentFailureAction()))
          );
      })
    )
  );
}
