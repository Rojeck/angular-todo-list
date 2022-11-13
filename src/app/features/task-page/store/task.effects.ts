import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Dashboard } from 'src/app/shared/interfaces/dashboard.interface';

import { TaskPageService } from '../services/task-page.service';
import {
  actionsWithTaskPostFailureAction,
  actionsWithTaskPostAction,
  actionsWithTaskSuccessAction,
  changeTaskStatusAction,
  changeTaskStatusFailureAction,
  taskDeleteAction,
  taskDeleteFailureAction,
  actionsWithTaskEditAction,
  actionsWithTaskEditFailureAction,
  sortTasksAction,
  sortTypeValueChangeAction,
  sortByValueChangeAction,
  getDashboardFailureAction,
  getDashboardAction,
  getDashboardSuccessAction,
  changeContainerColorAction,
  changeContainerColorFailureAction,
  dashboardDeleteAction,
  dashboardDeleteSuccessAction,
  dashboardDeleteFailureAction,
} from './task.actions';

@Injectable()
export class TaskPageEffect {
  constructor(
    private actions$: Actions,
    private taskService: TaskPageService
  ) {}

  updateDashboardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsWithTaskSuccessAction),
      switchMap(({ dashboardId }) => {
        return of(getDashboardAction({ dashboardId }));
      })
    )
  );

  changeTaskStatusEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeTaskStatusAction),
      switchMap(({ taskData, dashboardId, taskId }) => {
        return this.taskService
          .changeTaskStatus(dashboardId, taskId, taskData)
          .pipe(
            map(() => actionsWithTaskSuccessAction({ dashboardId })),
            catchError(() => of(changeTaskStatusFailureAction()))
          );
      })
    )
  );

  postDashboardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsWithTaskPostAction),
      switchMap(({ data, dashboardId }) => {
        return this.taskService.postTask(data, dashboardId).pipe(
          map(() => actionsWithTaskSuccessAction({ dashboardId })),
          catchError(() => of(actionsWithTaskPostFailureAction()))
        );
      })
    )
  );
  editTasksEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsWithTaskEditAction),
      switchMap(({ dashboardId, taskId, taskData }) => {
        return this.taskService.editTask(taskData, dashboardId, taskId).pipe(
          map(() => actionsWithTaskSuccessAction({ dashboardId })),
          catchError(() => of(actionsWithTaskEditFailureAction()))
        );
      })
    )
  );
  deleteDashboardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskDeleteAction),
      switchMap(({ dashboardId, taskId }) => {
        return this.taskService.deleteTask(dashboardId, taskId).pipe(
          map(() => actionsWithTaskSuccessAction({ dashboardId })),
          catchError(() => of(taskDeleteFailureAction()))
        );
      })
    )
  );
  sortDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        getDashboardSuccessAction,
        actionsWithTaskSuccessAction,
        sortTypeValueChangeAction,
        sortByValueChangeAction
      ),
      switchMap(() => {
        return of(
          sortTasksAction({
            dashboard: this.taskService.sortTasks(),
          })
        );
      })
    )
  );
  getDashdboardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDashboardAction),
      switchMap(({ dashboardId }) => {
        return this.taskService.getDashboard(dashboardId).pipe(
          map((dashboard: Dashboard) =>
            getDashboardSuccessAction({ dashboard: dashboard })
          ),
          catchError(() => of(getDashboardFailureAction()))
        );
      })
    )
  );
  changeColorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeContainerColorAction),
      switchMap(({ dashboardId, containerType, color }) => {
        return this.taskService
          .changeColor(dashboardId, containerType, color)
          .pipe(
            map(() => actionsWithTaskSuccessAction({ dashboardId })),
            catchError(() => of(changeContainerColorFailureAction()))
          );
      })
    )
  );
  deleteDashboardFromTaskPageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardDeleteAction),
      switchMap(({ dashboardId }) => {
        return this.taskService.deleteDashboard(dashboardId).pipe(
          map(() => dashboardDeleteSuccessAction()),
          catchError(() => of(dashboardDeleteFailureAction()))
        );
      })
    )
  );
  redirectToMainPageEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(dashboardDeleteSuccessAction),
        tap(() => {
          this.taskService.navigateToMainPage();
        })
      ),
    { dispatch: false }
  );
}
