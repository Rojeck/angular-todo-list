import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { Dashboard } from '../../../../shared/interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  @Input() subject!: Dashboard;
  @Output() editEmmiter = new EventEmitter();
  @Output() deleteEmmiter = new EventEmitter();
  title!: string;
  description?: string | undefined;
  dashboardId!: string;
  createdDate!: Date;
  taskCounterTodo!: number;
  taskCounterInProgress!: number;
  taskCounterDone!: number;
  constructor() {}

  ngOnInit(): void {
    this.initValues();
  }
  initValues(): void {
    this.title = this.subject.name;
    this.description = this.subject.description;
    this.createdDate = this.subject.created_at;
    this.taskCounterTodo = this.countTasks('TODO');
    this.taskCounterInProgress = this.countTasks('IN_PROGRESS');
    this.taskCounterDone = this.countTasks('DONE');
  }
  countTasks(status: 'TODO' | 'IN_PROGRESS' | 'DONE'): number {
    const count = this.subject.tasks.filter(
      (v: Task) => v.status === status
    ).length;
    if (count) {
      return count;
    }
    return 0;
  }
  editDashboard() {
    this.editEmmiter.emit(this.subject);
  }
  deleteDashboard() {
    this.deleteEmmiter.emit(this.subject);
  }
}
