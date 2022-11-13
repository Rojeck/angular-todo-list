import { Pipe, PipeTransform } from '@angular/core';
import { iStatus, Task } from 'src/app/shared/interfaces/task.interface';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(tasks: Task[], status: iStatus): Task[] {
    return tasks.filter((task) => task.status === status);
  }
}
