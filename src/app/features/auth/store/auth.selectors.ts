import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from './auth.interfaces';

export const featureSelector =
  createFeatureSelector<AuthStateInterface>('auth');
export const isSubmitSelector = createSelector(
  featureSelector,
  (state: AuthStateInterface) => state.isSubmitting
);
export const isLoggedInSelector = createSelector(
  featureSelector,
  (state: AuthStateInterface) => state.isLoggedIn
);
export const backEndErrorsSelector = createSelector(
  featureSelector,
  (state: AuthStateInterface) => state.backEndErrors
);
export const currentUserSelector = createSelector(
  featureSelector,
  (state: AuthStateInterface) => state.currentUser
);
