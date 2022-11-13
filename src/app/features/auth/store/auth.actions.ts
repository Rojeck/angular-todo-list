import { createAction, props } from '@ngrx/store';
import { CurrentUser } from 'src/app/shared/interfaces/current-user.interface';
import { AuthRequestInterface } from '../types/auth-types';
import { BackEndErrorInterface } from './auth.interfaces';

export const registerAction = createAction(
  '[AUTH] Register user',
  props<{ request: AuthRequestInterface }>()
);
export const registerSuccessAction = createAction(
  '[AUTH] Register success',
  props<{ currentUser: CurrentUser }>()
);
export const registerFailureAction = createAction(
  '[AUTH] Register failure',
  props<{ errors: BackEndErrorInterface }>()
);

export const loginAction = createAction(
  '[AUTH] Login user',
  props<{ request: AuthRequestInterface }>()
);
export const loginSuccessAction = createAction(
  '[AUTH] Login success',
  props<{ currentUser: CurrentUser }>()
);
export const loginFailureAction = createAction(
  '[AUTH] Login failure',
  props<{ errors: BackEndErrorInterface }>()
);

export const fetchUserAction = createAction(
  '[AUTH] Fetch user by access token'
);
export const fetchUserSuccessAction = createAction(
  '[AUTH] Fetch user success',
  props<{ currentUser: CurrentUser }>()
);
export const fetchUserFailureAction = createAction(
  '[AUTH] Fetch user failure',
  props<{ errors: BackEndErrorInterface }>()
);

export const logOutUserAction = createAction(
  '[AUTH] Log out user'
);
