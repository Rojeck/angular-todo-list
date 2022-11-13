import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Dashboard } from 'src/app/shared/interfaces/dashboard.interface';
import { Task } from 'src/app/shared/interfaces/task.interface';
import {
  getDashboardAction,
  sortByValueChangeAction,
  sortTypeValueChangeAction,
  taskDeleteAction,
} from '../../../store/task.actions';
import {
  backEndErrorsSelector,
  dashboardSelector,
  sortByValueSelector,
  sortTypeValueSelector,
} from '../../../store/task.selectors';
import { SortTasksValues } from '../../../types/tasks.types';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ArchiveComponent implements OnInit {
  backendErrors$!: Observable<boolean | null>;

  dashboard$!: Observable<Dashboard | null>;

  sortTypeValue$!: Observable<'ASC' | 'DESC'> | null;
  sortByValue$!: Observable<SortTasksValues> | null;
  isArchiveEmpty: boolean = true;

  filterValue: string = '';

  dashboardId!: string;
  taskId!: string;
  constructor(private store: Store, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.pipe(map((route) => route['id'])).subscribe((id) => {
      this.dashboardId = id;
      this.store.dispatch(getDashboardAction({ dashboardId: id }));
    });
    this.initValues();
    this.dashboard$.subscribe((dashboard) => {
      if (
        dashboard?.tasks.filter((task) => task.status === 'ARCHIVED').length === 0
      ) {
        this.isArchiveEmpty = true;
      } else {
        this.isArchiveEmpty = false;
      }
    });
  }

  initValues(): void {
    this.backendErrors$ = this.store.pipe(select(backEndErrorsSelector));
    this.dashboard$ = this.store.pipe(select(dashboardSelector));
    this.sortTypeValue$ = this.store.pipe(select(sortTypeValueSelector));
    this.sortByValue$ = this.store.pipe(select(sortByValueSelector));
  }
  deleteTask(subject: Task): void {
    this.store.dispatch(
      taskDeleteAction({ taskId: subject._id, dashboardId: this.dashboardId })
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
}
