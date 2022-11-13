import { createReducer, on } from '@ngrx/store';

import {
  actionsWithDashboardEditAction,
  actionsWithDashboardFailureAction,
  actionsWithDashboardPostAction,
  actionsWithDashboardSuccessAction,
  closeDashboardCreateModalAction,
  closeDashboardEditModalAction,
  dashboardDeleteAction,
  dashboardDeleteFailureAction,
  dashboardDeleteSuccessAction,
  getDashboardsAction,
  getDashboardsFailureAction,
  getDashboardsSuccessAction,
  openDashboardCreateModalAction,
  openDashboardEditModalAction,
  sortByValueChangeAction,
  sortDashboardsAction,
  sortTypeValueChangeAction,
} from './dashboard.actions';
import { DashboardStateInterface } from './dashboard.interfaces';

const initialState: DashboardStateInterface = {
  backEndErrors: null,
  dashboards: null,
  isLoading: null,
  isDashboardCreateModalOpen: false,
  isDashboardEditModalOpen: false,
  changeDashboardFailure: false,
  sortTypeValue: 'ASC',
  sortByValue: 'date',
};

export const dashboardsReducer = createReducer(
  initialState,
  on(getDashboardsAction, (state: DashboardStateInterface) => ({
    ...state,
    isLoading: true,
  })),
  on(getDashboardsSuccessAction, (state: DashboardStateInterface, action) => ({
    ...state,
    isLoading: false,
    dashboards: action.dashboards,
  })),
  on(getDashboardsFailureAction, (state: DashboardStateInterface) => ({
    ...state,
    isLoading: false,
    backEndErrors: true,
    dashboards: null,
  })),
  on(openDashboardCreateModalAction, (state: DashboardStateInterface) => ({
    ...state,
    isDashboardCreateModalOpen: true,
  })),
  on(closeDashboardCreateModalAction, (state: DashboardStateInterface) => ({
    ...state,
    isDashboardCreateModalOpen: false,
  })),
  on(actionsWithDashboardPostAction, (state: DashboardStateInterface) => ({
    ...state,
    isLoading: true,
    changeDashboardFailure: false,
  })),
  on(actionsWithDashboardEditAction, (state: DashboardStateInterface) => ({
    ...state,
    isLoading: true,
    changeDashboardFailure: false,
  })),
  on(actionsWithDashboardSuccessAction, (state: DashboardStateInterface) => ({
    ...state,
    isDashboardCreateModalOpen: false,
    isDashboardEditModalOpen: false,
    isLoading: false,
  })),
  on(actionsWithDashboardFailureAction, (state: DashboardStateInterface) => ({
    ...state,
    isLoading: false,
    changeDashboardFailure: true,
  })),
  on(openDashboardEditModalAction, (state: DashboardStateInterface) => ({
    ...state,
    isDashboardEditModalOpen: true,
  })),
  on(closeDashboardEditModalAction, (state: DashboardStateInterface) => ({
    ...state,
    isDashboardEditModalOpen: false,
  })),
  on(dashboardDeleteAction, (state: DashboardStateInterface) => ({
    ...state,
  })),
  on(dashboardDeleteSuccessAction, (state: DashboardStateInterface) => ({
    ...state,
  })),
  on(dashboardDeleteFailureAction, (state: DashboardStateInterface) => ({
    ...state,
  })),
  on(sortByValueChangeAction, (state: DashboardStateInterface, action) => ({
    ...state,
    sortByValue: action.value,
  })),
  on(sortTypeValueChangeAction, (state: DashboardStateInterface, action) => ({
    ...state,
    sortTypeValue: action.value,
  })),
  on(sortDashboardsAction, (state: DashboardStateInterface, action) => ({
    ...state,
    dashboards: action.dashboards,
  }))
);
