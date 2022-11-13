import { createAction, props } from '@ngrx/store';
import {
  ActionsWithDashboardRequest,
  Dashboard,
} from '../../../shared/interfaces/dashboard.interface';
import { SortDashboardsValues } from '../types/sort.interface';

export const getDashboardsAction = createAction('[DASHBOARDS] Get dashboards');

export const getDashboardsSuccessAction = createAction(
  '[DASHBOARDS] Get dashboards success',
  props<{ dashboards: Dashboard[] }>()
);

export const getDashboardsFailureAction = createAction(
  '[DASHBOARDS] Get dashboards failure'
);

export const openDashboardCreateModalAction = createAction(
  '[DASHBOARDS] Open dashboard create modal'
);
export const openDashboardEditModalAction = createAction(
  '[DASHBOARDS] Open dashboard edit modal'
);
export const closeDashboardCreateModalAction = createAction(
  '[DASHBOARDS] Close dashboard create modal'
);
export const closeDashboardEditModalAction = createAction(
  '[DASHBOARDS] Close dashboard create modal'
);
export const actionsWithDashboardPostAction = createAction(
  '[DASHBOARDS] Create dashboard action',
  props<{ dashboard: ActionsWithDashboardRequest }>()
);
export const actionsWithDashboardEditAction = createAction(
  '[DASHBOARDS] Edit dashboard action',
  props<{ dashboard: ActionsWithDashboardRequest; dashboardId: string }>()
);
export const actionsWithDashboardSuccessAction = createAction(
  '[DASHBOARDS] Create/edit dashboard success action'
);
export const actionsWithDashboardFailureAction = createAction(
  '[DASHBOARDS] Create/edit dashboard failure action'
);
export const dashboardDeleteAction = createAction(
  '[DASHBOARDS] Delete dashboard action',
  props<{ dashboardId: string }>()
);
export const dashboardDeleteSuccessAction = createAction(
  '[DASHBOARDS] Delete dashboard success action'
);
export const dashboardDeleteFailureAction = createAction(
  '[DASHBOARDS] Delete dashboard failure action'
);
export const sortByValueChangeAction = createAction(
  '[DASHBOARDS] sort by value change',
  props<{ value: SortDashboardsValues }>()
);
export const sortTypeValueChangeAction = createAction(
  '[DASHBOARDS] sort type value change',
  props<{ value: 'ASC' | 'DESC' }>()
);
export const sortDashboardsAction = createAction(
  '[DASHBOARDS] sort dashboards action',
  props<{ dashboards: Dashboard[] | null }>()
);
