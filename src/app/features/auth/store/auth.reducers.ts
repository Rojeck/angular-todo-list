import { on, createReducer } from '@ngrx/store';
import {
  fetchUserAction,
  fetchUserFailureAction,
  fetchUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  logOutUserAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './auth.actions';
import { AuthStateInterface } from './auth.interfaces';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoggedIn: null,
  currentUser: null,
  backEndErrors: null,
};

export const authReducer = createReducer(
  initialState,
  on(registerAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: true,
    backEndErrors: null,
  })),
  on(registerSuccessAction, (state, action) => ({
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
    backEndErrors: null,
  })),
  on(registerFailureAction, (state: AuthStateInterface, action) => ({
    ...state,
    isSubmitting: false,
    backEndErrors: action.errors,
  })),

  on(loginAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: true,
    backEndErrors: null,
  })),
  on(loginSuccessAction, (state, action) => ({
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
    backEndErrors: null,
  })),
  on(loginFailureAction, (state: AuthStateInterface, action) => ({
    ...state,
    isSubmitting: false,
    backEndErrors: action.errors,
  })),

  on(fetchUserAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: true,
    backEndErrors: null,
  })),
  on(fetchUserSuccessAction, (state, action) => ({
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
    backEndErrors: null,
  })),
  on(fetchUserFailureAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: false,
    currentUser: null,
  })),

  on(logOutUserAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: false,
    currentUser: null,
  }))
);
