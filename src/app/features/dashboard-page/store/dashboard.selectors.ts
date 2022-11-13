import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardStateInterface } from './dashboard.interfaces';

export const featureSelector =
  createFeatureSelector<DashboardStateInterface>('dashboards');
export const isLoadingSelector = createSelector(
  featureSelector,
  (state: DashboardStateInterface) => state.isLoading
);
export const dashboardsSelector = createSelector(
  featureSelector,
  (state: DashboardStateInterface) => state.dashboards
);
export const backEndErrorsSelector = createSelector(
  featureSelector,
  (state: DashboardStateInterface) => state.backEndErrors
);

export const isDashboardCreateModalOpenSelector = createSelector(
    featureSelector,
    (state: DashboardStateInterface) => state.isDashboardCreateModalOpen
  );

  export const isDashboardEditModalOpenSelector = createSelector(
    featureSelector,
    (state: DashboardStateInterface) => state.isDashboardEditModalOpen
  );

  export const changeDashboardFailureSelector = createSelector(
    featureSelector,
    (state: DashboardStateInterface) => state.changeDashboardFailure
  );

  export const sortTypeValueSelector = createSelector(
    featureSelector,
    (state: DashboardStateInterface) => state.sortTypeValue
  );

  export const sortByValueSelector = createSelector(
    featureSelector,
    (state: DashboardStateInterface) => state.sortByValue
  );