import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  actionsWithDashboardEditAction,
  actionsWithDashboardPostAction,
  closeDashboardCreateModalAction,
  closeDashboardEditModalAction,
  dashboardDeleteAction,
  getDashboardsAction,
  openDashboardCreateModalAction,
  openDashboardEditModalAction,
  sortByValueChangeAction,
  sortTypeValueChangeAction,
} from './store/dashboard.actions';
import {
  backEndErrorsSelector,
  changeDashboardFailureSelector,
  dashboardsSelector,
  isDashboardCreateModalOpenSelector,
  isDashboardEditModalOpenSelector,
  sortByValueSelector,
  sortTypeValueSelector,
} from './store/dashboard.selectors';
import { Dashboard } from '../../shared/interfaces/dashboard.interface';
import { SortDashboardsValues } from './types/sort.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  dashboards$!: Observable<Dashboard[] | null>;
  subject!: Dashboard;

  getDashboardsError$!: Observable<boolean | null>;
  changeDashboardsError$!: Observable<boolean | null>;

  isCreateModalVisible$!: Observable<boolean>;
  isEditModalVisible$!: Observable<boolean>;

  isValidationError: boolean = false;
  dashboardForm!: FormGroup;

  sortTypeValue$!: Observable<'ASC' | 'DESC'> | null;
  sortByValue$!: Observable<SortDashboardsValues> | null;

  filterValue: string = '';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getDashboardsAction());
    this.initValues();
  }
  setFilterValue(value: string) {
    this.filterValue = value;
  }
  sortTypeChange(value: 'ASC' | 'DESC'): void {
    this.store.dispatch(sortTypeValueChangeAction({ value }));
  }
  sortByChange(value: SortDashboardsValues): void {
    this.store.dispatch(sortByValueChangeAction({ value }));
  }
  private createForm(
    name: string | null = null,
    description: string | null = null,
    descriptionDisabled: boolean = false
  ): void {
    this.dashboardForm = new FormGroup({
      name: new FormControl(name, [
        Validators.minLength(6),
        Validators.maxLength(24),
        Validators.required,
      ]),
      description: new FormControl(
        { value: description, disabled: descriptionDisabled },
        Validators.maxLength(52)
      ),
    });
  }
  private initValues(): void {
    this.dashboards$ = this.store.pipe(select(dashboardsSelector));
    this.getDashboardsError$ = this.store.pipe(select(backEndErrorsSelector));
    this.changeDashboardsError$ = this.store.pipe(
      select(changeDashboardFailureSelector)
    );
    this.isCreateModalVisible$ = this.store.pipe(
      select(isDashboardCreateModalOpenSelector)
    );
    this.isEditModalVisible$ = this.store.pipe(
      select(isDashboardEditModalOpenSelector)
    );
    this.sortTypeValue$ = this.store.pipe(select(sortTypeValueSelector));
    this.sortByValue$ = this.store.pipe(select(sortByValueSelector));
  }
  private checkError(): boolean {
    if (
      this.dashboardForm.get('name')?.errors ||
      this.dashboardForm.get('description')?.errors
    ) {
      this.isValidationError = true;
      return false;
    } else {
      this.isValidationError = false;
      return true;
    }
  }
  openDashboardCreateWindow(): void {
    this.createForm();
    this.store.dispatch(openDashboardCreateModalAction());
  }
  closeDashboardCreateModal(): void {
    this.store.dispatch(closeDashboardCreateModalAction());
  }
  postDashboard(): void {
    if (this.checkError()) {
      this.store.dispatch(
        actionsWithDashboardPostAction({
          dashboard: this.dashboardForm.value,
        })
      );
      this.dashboardForm.reset();
    }
  }
  openDashboardEditWindow(subject: Dashboard): void {
    this.subject = subject;
    this.createForm(subject.name, subject.description, true);
    this.store.dispatch(openDashboardEditModalAction());
  }
  closeDashboardEditModal(): void {
    this.store.dispatch(closeDashboardEditModalAction());
  }
  editDashboard(): void {
    if (this.checkError()) {
      this.store.dispatch(
        actionsWithDashboardEditAction({
          dashboard: this.dashboardForm.value,
          dashboardId: this.subject._id,
        })
      );
      this.dashboardForm.reset();
    }
  }
  deleteDashboard(subject: Dashboard): void {
    this.store.dispatch(dashboardDeleteAction({ dashboardId: subject._id }));
  }
}
