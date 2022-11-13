import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskViewPageComponent } from "./task-view-page.component";

const routes: Routes = [
    {
      path: '',
      component: TaskViewPageComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TaskViewPageRoutingModule { }
  