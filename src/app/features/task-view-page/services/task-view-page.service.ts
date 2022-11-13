import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DashboardResponce } from 'src/app/shared/interfaces/dashboard.interface';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { environment } from 'src/environments/environment';
import { commentRequest } from '../types/comment.interface';

@Injectable()
export class TaskViewPageService {
  constructor(private http: HttpClient) {}

  getTask(dashboardId: string, taskId: string): Observable<Task | undefined> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}`;
    return this.http.get<DashboardResponce>(url).pipe(
      map((dashboard: DashboardResponce) => {
        const task = dashboard.tasks.find((task: Task) => task._id === taskId);
        if (!task) {
          throw new Error('Task does not exist');
        }
        return task;
      })
    );
  }
  postComment(
    dashboardId: string,
    taskId: string,
    data: commentRequest
  ): Observable<void> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/tasks/${taskId}/comments`;
    return this.http.post<void>(url, data);
  }
  deleteComment(
    dashboardId: string,
    taskId: string,
    commentId: string
  ): Observable<void> {
    const url: string = `${environment.apiUrl}dashboards/${dashboardId}/tasks/${taskId}/comments/${commentId}`;
    return this.http.delete<void>(url);
  }
}
