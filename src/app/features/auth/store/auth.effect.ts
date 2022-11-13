import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUser } from 'src/app/shared/interfaces/current-user.interface';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { AuthService } from '../services/auth-service';
import {
  fetchUserAction,
  fetchUserFailureAction,
  fetchUserSuccessAction,
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './auth.actions';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalstorageService
  ) {}
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.registerUser(request).pipe(
          map((currentUser: CurrentUser) => {
            this.localStorage.set('accessToken', currentUser.accessToken);
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(registerFailureAction({ errors: errorResponce.error }));
          })
        );
      })
    )
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.loginUser(request).pipe(
          map((currentUser: CurrentUser) => {
            this.localStorage.set('accessToken', currentUser.accessToken);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(loginFailureAction({ errors: errorResponce.error }));
          })
        );
      })
    )
  );
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserAction),
      switchMap(() => {
        return this.authService.fetchUser().pipe(
          map((currentUser: CurrentUser) => {
            return fetchUserSuccessAction({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(fetchUserFailureAction({ errors: errorResponce.error }));
          })
        );
      })
    )
  );
  redirectAfterAuthSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction, loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
