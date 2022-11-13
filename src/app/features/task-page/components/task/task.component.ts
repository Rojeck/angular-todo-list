import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnInit {
  @Input() subject!: Task;
  @Input() isMenuVisible: boolean = true;
  @Output() editEmmiter = new EventEmitter();
  @Output() deleteEmmiter = new EventEmitter();
  @Output() archiveEmmiter = new EventEmitter();

  title!: string;
  description?: string | undefined;
  taskId!: string;
  createdDate!: Date;
  commentsCount!: number;

  constructor() {}

  ngOnInit(): void {
    this.title = this.subject.name;
    this.description = this.subject.description;
    this.createdDate = this.subject.created_at;
    this.taskId = this.subject._id;
    this.commentsCount = this.subject.comments.length;
  }

  dropStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData('text', target.id);
    target.style.opacity = '0.4';
  }

  dropEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    target.style.opacity = '1';
  }

  editTask() {
    this.editEmmiter.emit(this.subject);
  }

  deleteTask() {
    this.deleteEmmiter.emit(this.subject);
  }

  archiveTask() {
    console.log('archive');
    this.archiveEmmiter.emit(this.subject);
  }
}
