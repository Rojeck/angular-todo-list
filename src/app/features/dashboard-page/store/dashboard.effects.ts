import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { DashboardPageService } from '../services/dashboard-page.service';
import { Dashboard } from '../../../shared/interfaces/dashboard.interface';
import {
  actionsWithDashboardEditAction,
  actionsWithDashboardFailureAction,
  actionsWithDashboardPostAction,
  actionsWithDashboardSuccessAction,
  dashboardDeleteAction,
  dashboardDeleteFailureAction,
  dashboardDeleteSuccessAction,
  getDashboardsAction,
  getDashboardsFailureAction,
  getDashboardsSuccessAction,
  sortByValueChangeAction,
  sortDashboardsAction,
  sortTypeValueChangeAction,
} from './dashboard.actions';

@Injectable()
export class DashboardEffect {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardPageService
  ) {}

  sortDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        getDashboardsSuccessAction,
        sortTypeValueChangeAction,
        sortByValueChangeAction
      ),
      switchMap(() => {
        return of(
          sortDashboardsAction({
            dashboards: this.dashboardService.sortDashboards(),
          })
        );
      })
    )
  );

  getDashboardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        getDashboardsAction,
        actionsWithDashboardSuccessAction,
        dashboardDeleteSuccessAction
      ),
      switchMap(() => {
        return this.dashboardService.getDashboards().pipe(
          map((dashboard: Dashboard[]) =>
            getDashboardsSuccessAction({ dashboards: dashboard })
          ),
          catchError(() => of(getDashboardsFailureAction()))
        );
      })
    )
  );

  postDashboardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsWithDashboardPostAction),
      switchMap(({ dashboard }) => {
        return this.dashboardService.postDashboard(dashboard).pipe(
          map(() => actionsWithDashboardSuccessAction()),
          catchError(() => of(actionsWithDashboardFailureAction()))
        );
      })
    )
  );
  editDashboardsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsWithDashboardEditAction),
      switchMap(({ dashboard, dashboardId }) => {
        return this.dashboardService.editDashboard(dashboard, dashboardId).pipe(
          map(() => actionsWithDashboardSuccessAction()),
          catchError(() => of(actionsWithDashboardFailureAction()))
        );
      })
    )
  );
  deleteDashboardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardDeleteAction),
      switchMap(({ dashboardId }) => {
        return this.dashboardService.deleteDashboard(dashboardId).pipe(
          map(() => dashboardDeleteSuccessAction()),
          catchError(() => of(dashboardDeleteFailureAction()))
        );
      })
    )
  );
}
