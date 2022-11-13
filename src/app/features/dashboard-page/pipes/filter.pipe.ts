import { Pipe, PipeTransform } from '@angular/core';
import { Dashboard } from 'src/app/shared/interfaces/dashboard.interface';

@Pipe({
  name: 'filterDashboards',
})
export class FilterPipe implements PipeTransform {
  transform(dashboards: Dashboard[], filterValue: string): Dashboard[] {
    return dashboards.filter((dashboard) => {
      if (dashboard.name.toLowerCase().includes(filterValue.toLowerCase())) {
        return true;
      }
      if (
        dashboard.tasks.filter((task) =>
          task.name.toLowerCase().includes(filterValue.toLowerCase())
        ).length
      ) {
        return true;
      }
      return false;
    });
  }
}
