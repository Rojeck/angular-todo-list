import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './components/archive/archive/archive.component';
import { TaskPageComponent } from './task-page.component';

const routes: Routes = [
  {
    path: '',
    component: TaskPageComponent,
  },
  {
    path: 'archive',
    component: ArchiveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskPageRoutingModule {}
