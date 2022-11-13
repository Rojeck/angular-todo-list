import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Dashboard } from 'src/app/shared/interfaces/dashboard.interface';
import { iStatus, Task } from 'src/app/shared/interfaces/task.interface';

import {
  actionsWithTaskEditAction,
  actionsWithTaskPostAction,
  changeTaskStatusAction,
  closeTaskCreateModalAction,
  closeTaskEditModalAction,
  dashboardDeleteAction,
  getDashboardAction,
  openTaskCreateModalAction,
  openTaskEditModalAction,
  sortByValueChangeAction,
  sortTypeValueChangeAction,
  taskDeleteAction,
} from './store/task.actions';
import {
  backEndErrorsSelector,
  changeTaskFailureSelector,
  dashboardSelector,
  isTaskCreateModalOpenSelector,
  isTaskEditModalOpenSelector,
  sortByValueSelector,
  sortTypeValueSelector,
} from './store/task.selectors';
import { SortTasksValues, TaskContainerType } from './types/tasks.types';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPageComponent implements OnInit {
  isCreateModalVisible$!: Observable<boolean>;
  isEditModalVisible$!: Observable<boolean>;
  backendErrors$!: Observable<boolean | null>;
  isValidationError: boolean = false;
  changeTaskFailure$!: Observable<boolean | null>;
  dashboard$!: Observable<Dashboard | null>;

  sortTypeValue$!: Observable<'ASC' | 'DESC'> | null;
  sortByValue$!: Observable<SortTasksValues> | null;

  filterValue: string = '';

  dashboardId!: string;
  taskId!: string;
  taskForm!: FormGroup;

  constructor(private store: Store, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.initValues();
    this.router.params.pipe(map((route) => route['id'])).subscribe((id) => {
      this.dashboardId = id;
      this.store.dispatch(getDashboardAction({ dashboardId: id }));
    });
  }
  archiveTasks(subject: Task) {
    this.store.dispatch(
      changeTaskStatusAction({
        taskData: {
          status: 'ARCHIVED',
        },
        dashboardId: this.dashboardId,
        taskId: subject._id,
      })
    );
  }
  setFilterValue(value: string) {
    this.filterValue = value;
  }
  sortTypeChange(value: 'ASC' | 'DESC'): void {
    this.store.dispatch(sortTypeValueChangeAction({ value }));
  }
  sortByChange(value: SortTasksValues): void {
    this.store.dispatch(sortByValueChangeAction({ value }));
  }

  private initValues(): void {
    this.isCreateModalVisible$ = this.store.pipe(
      select(isTaskCreateModalOpenSelector)
    );
    this.isEditModalVisible$ = this.store.pipe(
      select(isTaskEditModalOpenSelector)
    );

    this.changeTaskFailure$ = this.store.pipe(
      select(changeTaskFailureSelector)
    );
    this.backendErrors$ = this.store.pipe(select(backEndErrorsSelector));
    this.dashboard$ = this.store.pipe(select(dashboardSelector));
    this.sortTypeValue$ = this.store.pipe(select(sortTypeValueSelector));
    this.sortByValue$ = this.store.pipe(select(sortByValueSelector));
  }
  private createForm(
    name: string | null = null,
    description: string | null = null,
    descriptionDisabled: boolean = false,
    taskStatus?: iStatus
  ): void {
    this.taskForm = new FormGroup({
      name: new FormControl(name, [
        Validators.minLength(6),
        Validators.maxLength(24),
        Validators.required,
      ]),
      description: new FormControl(
        { value: description, disabled: descriptionDisabled },
        Validators.maxLength(150)
      ),
      status: new FormControl(taskStatus),
    });
  }
  private checkError(): boolean {
    if (
      this.taskForm.get('name')?.errors ||
      this.taskForm.get('description')?.errors
    ) {
      this.isValidationError = true;
      return false;
    } else {
      this.isValidationError = false;
      return true;
    }
  }
  deleteDashboard() {
    this.store.dispatch(
      dashboardDeleteAction({ dashboardId: this.dashboardId })
    );
  }
  openTaskCreateWindow(taskStatus: iStatus): void {
    this.createForm(null, null, false, taskStatus);
    this.store.dispatch(openTaskCreateModalAction());
  }
  closeTaskCreateModal(): void {
    this.store.dispatch(closeTaskCreateModalAction());
  }
  postTask(): void {
    if (this.checkError()) {
      this.store.dispatch(
        actionsWithTaskPostAction({
          data: this.taskForm.value,
          dashboardId: this.dashboardId,
        })
      );
      this.taskForm.reset();
    }
  }

  dragDrop(event: DragEvent) {
    const container = event.target as HTMLElement;
    const containerType = container.dataset['type'] as iStatus;
    const taskId = event.dataTransfer?.getData('text') as string;
    this.store.dispatch(
      changeTaskStatusAction({
        taskData: {
          status: containerType,
        },
        dashboardId: this.dashboardId,
        taskId: taskId,
      })
    );
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }
  openTaskEditWindow(subject: Task): void {
    this.taskId = subject._id;
    this.createForm(subject.name, subject.description, false);
    this.store.dispatch(openTaskEditModalAction());
  }
  closeTaskEditModal(): void {
    this.store.dispatch(closeTaskEditModalAction());
  }
  editTask(subject: Task): void {
    if (this.checkError()) {
      this.store.dispatch(
        actionsWithTaskEditAction({
          taskData: this.taskForm.value,
          dashboardId: this.dashboardId,
          taskId: this.taskId,
        })
      );
      this.taskForm.reset();
    }
  }
  deleteTask(subject: Task): void {
    this.store.dispatch(
      taskDeleteAction({ taskId: subject._id, dashboardId: this.dashboardId })
    );
  }
}
