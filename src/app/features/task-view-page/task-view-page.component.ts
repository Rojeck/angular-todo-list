import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { Task } from 'src/app/shared/interfaces/task.interface';

import { getTaskAction } from './store/task-view-page.actions';
import {
  backEndErrorSelector,
  taskSelector,
} from './store/task-view-page.selectors';

@Component({
  selector: 'app-task-view-page',
  templateUrl: './task-view-page.component.html',
  styleUrls: ['./task-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewPageComponent implements OnInit {
  backEndErrors$!: Observable<boolean | null>;
  task!: Observable<Task | undefined | null>;
  dashboardId!: string;
  taskId!: string;

  constructor(private store: Store, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.getTask();
    this.initValues();
  }

  private getTask(): void {
    this.router.params
      .pipe(
        map((route) => ({
          taskId: route['taskId'],
          dashboardId: route['id'],
        }))
      )
      .subscribe((routes) => {
        this.dashboardId = routes.dashboardId;
        this.taskId = routes.taskId;
        this.store.dispatch(
          getTaskAction({
            dashboardId: routes.dashboardId,
            taskId: routes.taskId,
          })
        );
      });
  }

  private initValues(): void {
    this.task = this.store.select(taskSelector);
    this.backEndErrors$ = this.store.select(backEndErrorSelector);
  }
}
