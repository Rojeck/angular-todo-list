import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable, tap } from 'rxjs';
import {
  ActionsWithDashboardResponce,
  Dashboard,
  DashboardResponce,
} from 'src/app/shared/interfaces/dashboard.interface';
import {
  iStatus,
  TaskEditRequest,
  TaskRequest,
  TaskStatusChangeRequest,
} from 'src/app/shared/interfaces/task.interface';

import { environment } from 'src/environments/environment';
import {
  dashboardSelector,
  sortByValueSelector,
  sortTypeValueSelector,
} from '../store/task.selectors';
import { Color, SortTasksValues } from '../types/tasks.types';

@Injectable()
export class TaskPageService {
  dashboard!: Dashboard | null;
  sortTypeValue!: 'ASC' | 'DESC';
  sortByValue!: SortTasksValues;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {
    this.store.select(dashboardSelector).subscribe((dashboard) => {
      this.dashboard = dashboard;
    });
    this.store.select(sortTypeValueSelector).subscribe((value) => {
      this.sortTypeValue = value;
    });
    this.store.select(sortByValueSelector).subscribe((value) => {
      this.sortByValue = value;
    });
  }

  postTask(
    data: TaskRequest,
    dashboardId: string
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/tasks`;
    return this.http.post<ActionsWithDashboardResponce>(url, data);
  }

  editTask(
    data: TaskEditRequest,
    dashboardId: string,
    taskId: string
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/tasks/${taskId}`;
    return this.http.patch<ActionsWithDashboardResponce>(url, data);
  }

  deleteTask(
    dashboardId: string,
    taskId: string
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/tasks/${taskId}`;
    return this.http.delete<ActionsWithDashboardResponce>(url);
  }

  changeTaskStatus(
    dashboardId: string,
    taskId: string,
    data: TaskStatusChangeRequest
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/tasks/${taskId}`;
    return this.http.put<ActionsWithDashboardResponce>(url, data);
  }

  sortTasks(): Dashboard | null {
    if (this.dashboard) {
      let sortedDashboard = JSON.parse(JSON.stringify(this.dashboard));
      switch (this.sortByValue) {
        case 'name':
          sortedDashboard = this.sortByName(sortedDashboard);
          break;
        case 'date':
          sortedDashboard = this.sortByDate(sortedDashboard);
          break;
      }
      if (this.sortTypeValue === 'DESC') {
        sortedDashboard = this.sortReverse(sortedDashboard);
      }
      return sortedDashboard;
    } else {
      return null;
    }
  }

  private sortByName(dashboard: Dashboard): Dashboard {
    dashboard.tasks = dashboard.tasks.sort((a, b) =>
      a['name'] > b['name'] ? 1 : -1
    );
    return dashboard;
  }

  private sortByDate(dashboard: Dashboard): Dashboard {
    dashboard.tasks = dashboard.tasks.sort(
      (a, b) =>
        Date.parse(b['created_at'].toString()) -
        Date.parse(a['created_at'].toString())
    );
    return dashboard;
  }

  private sortReverse(dashboard: Dashboard): Dashboard {
    dashboard.tasks = dashboard.tasks.reverse();
    return dashboard;
  }

  getDashboard(dashboardId: string): Observable<Dashboard> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}`;
    return this.http.get<DashboardResponce>(url).pipe(
      map((dashboard: DashboardResponce) => ({
        name: dashboard.name,
        description: dashboard.description,
        created_at: dashboard.created_at,
        created_by: dashboard.created_by,
        _id: dashboard._id,
        tasks: dashboard.tasks,
        colors: dashboard.colors,
      }))
    );
  }

  changeColor(
    dashboardId: string,
    containerType: iStatus,
    color: Color
  ): Observable<Dashboard> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/color/${containerType}`;
    return this.http.put<any>(url, color);
  }

  deleteDashboard(
    dashboardId: string
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}`;
    return this.http.delete<ActionsWithDashboardResponce>(url);
  }

  navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
