import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/features/dashboard-page/dashboard-page.module').then(
        (m) => m.DashboardPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'dashboard/:id',
    loadChildren: () =>
      import('src/app/features/task-page/task-page.module').then(
        (m) => m.TaskPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'dashboard/:id/tasks/:taskId',
    loadChildren: () =>
      import('src/app/features/task-view-page/task-view-page.module').then(
        (m) => m.TaskViewPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
