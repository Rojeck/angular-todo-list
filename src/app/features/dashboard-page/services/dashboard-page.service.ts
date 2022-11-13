import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ActionsWithDashboardResponce,
  ActionsWithDashboardRequest,
  Dashboard,
  DashboardResponce,
} from '../../../shared/interfaces/dashboard.interface';

import {
  dashboardsSelector,
  sortByValueSelector,
  sortTypeValueSelector,
} from '../store/dashboard.selectors';
import { SortDashboardsValues } from '../types/sort.interface';

@Injectable()
export class DashboardPageService {
  dashboards!: Dashboard[] | null;
  sortTypeValue!: 'ASC' | 'DESC';
  sortByValue!: SortDashboardsValues;
  constructor(private http: HttpClient, private store: Store) {
    this.store.select(dashboardsSelector).subscribe((dashboards) => {
      this.dashboards = dashboards;
    });
    this.store.select(sortTypeValueSelector).subscribe((value) => {
      this.sortTypeValue = value;
    });
    this.store.select(sortByValueSelector).subscribe((value) => {
      this.sortByValue = value;
    });
  }

  getDashboards(): Observable<Dashboard[]> {
    const url: string = environment.apiUrl + 'dashboards';
    return this.http.get<DashboardResponce[]>(url).pipe(
      map((dashboard: DashboardResponce[]) =>
        dashboard.map((element: DashboardResponce) => ({
          name: element.name,
          description: element.description,
          created_at: element.created_at,
          created_by: element.created_by,
          _id: element._id,
          tasks: element.tasks,
          colors: element.colors
        }))
      )
    );
  }
  postDashboard(
    data: ActionsWithDashboardRequest
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = environment.apiUrl + 'dashboards';
    return this.http.post<ActionsWithDashboardResponce>(url, data);
  }
  editDashboard(
    data: ActionsWithDashboardRequest,
    dashboardId: string
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}`;
    return this.http.patch<ActionsWithDashboardResponce>(url, data);
  }
  deleteDashboard(
    dashboardId: string
  ): Observable<ActionsWithDashboardResponce> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}`;
    return this.http.delete<ActionsWithDashboardResponce>(url);
  }
  sortDashboards(): Dashboard[] | null {
    if (this.dashboards) {
      let sortedDashboards = [...this.dashboards];
      switch (this.sortByValue) {
        case 'name':
          sortedDashboards = this.sortByName(sortedDashboards);
          break;
        case 'date':
          sortedDashboards = this.sortByDate(sortedDashboards);
          break;
        case 'countOfTasks':
          sortedDashboards = this.sortByTasksCount(sortedDashboards);
          break;
        default:
          break;
      }
      if (this.sortTypeValue === 'DESC') {
        sortedDashboards = this.sortReverse(sortedDashboards);
      }
      return sortedDashboards;
    } else {
      return null;
    }
  }

  private sortByName(dashboardArray: Dashboard[]): Dashboard[] {
    return dashboardArray.sort((a, b) => (a?.name > b?.name ? 1 : -1));
  }
  private sortByDate(dashboardArray: Dashboard[]): Dashboard[] {
    console.log(
      dashboardArray.sort(
        (a, b) =>
          Date.parse(b['created_at'].toString()) -
          Date.parse(a['created_at'].toString())
      )
    );

    return dashboardArray.sort(
      (a, b) =>
        Date.parse(b['created_at'].toString()) -
        Date.parse(a['created_at'].toString())
    );
  }
  private sortByTasksCount(dashboardArray: Dashboard[]): Dashboard[] {
    return dashboardArray.sort((a, b) => b.tasks.length - a.tasks.length);
  }
  private sortReverse(dashboardArray: Dashboard[]): Dashboard[] {
    return dashboardArray.reverse();
  }
}
