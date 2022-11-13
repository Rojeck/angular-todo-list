import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from './features/auth/services/auth-service';
import { fetchUserAction } from './features/auth/store/auth.actions';
import { LocalstorageService } from './shared/services/localstorage/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.fetchUserByLoadingApp();
  }
  constructor(
    private localStorage: LocalstorageService,
    private store: Store,
    private router: Router
  ) {}
  fetchUserByLoadingApp() {
    if (this.localStorage.get('accessToken')) {
      this.store.dispatch(fetchUserAction());
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
