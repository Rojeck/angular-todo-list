import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(tasks: Task[], filterValue: string): Task[] {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}
