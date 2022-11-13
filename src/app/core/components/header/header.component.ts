import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth-service';
import {
  currentUserSelector,
  isLoggedInSelector,
} from 'src/app/features/auth/store/auth.selectors';
import { CurrentUser } from 'src/app/shared/interfaces/current-user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>;
  currentUserUsername$!: Observable<string | null>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initValues();
  }
  private initValues() {
    this.currentUserUsername$ = this.store.pipe(
      select(currentUserSelector),
      map((currentUser: CurrentUser | null) => {
        if (currentUser) {
          return currentUser.username;
        } else {
          return null;
        }
      })
    );
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
  takeLogOut() {
    this.authService.logOutUser();
    this.router.navigateByUrl('/auth/login');
  }
}
