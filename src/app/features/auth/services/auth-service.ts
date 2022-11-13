import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AuthRequestInterface,
  AuthResponceInterface,
} from '../types/auth-types';

import { environment } from 'src/environments/environment';
import {
  CurrentUser,
  User,
} from 'src/app/shared/interfaces/current-user.interface';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from 'src/app/shared/services/localstorage/localstorage.service';
import { Store } from '@ngrx/store';
import { logOutUserAction } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService,
    private store: Store
  ) {}

  registerUser(registerData: AuthRequestInterface): Observable<CurrentUser> {
    const url: string = environment.apiUrl + 'auth/register';
    return this.http.post<AuthResponceInterface>(url, registerData).pipe(
      map((user: AuthResponceInterface) => ({
        username: user.user.username,
        password: user.user.password,
        accessToken: user.jwt_token,
        id: user.user._id,
      }))
    );
  }
  loginUser(registerData: AuthRequestInterface): Observable<CurrentUser> {
    const url: string = environment.apiUrl + 'auth/login';
    return this.http.post<AuthResponceInterface>(url, registerData).pipe(
      map((user: AuthResponceInterface) => ({
        username: user.user.username,
        password: user.user.password,
        accessToken: user.jwt_token,
        id: user.user._id,
      }))
    );
  }
  fetchUser(): Observable<CurrentUser> {
    const url: string = environment.apiUrl + 'users/me';
    return this.http.get<User>(url).pipe(
      map((user: User) => ({
        username: user.username,
        password: user.password,
        id: user._id,
      }))
    );
  }
  logOutUser(): void {
    if (this.localStorage.remove('accessToken')) {
      this.store.dispatch(logOutUserAction());
    } else {
      console.error('Log out error');
    }
  }
}
