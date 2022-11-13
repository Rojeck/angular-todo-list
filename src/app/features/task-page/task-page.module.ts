import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskPageComponent } from './task-page.component';
import { TaskComponent } from './components/task/task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskPageRoutingModule } from './task-page-routing.module';
import { StoreModule } from '@ngrx/store';
import { TaskPageEffect } from './store/task.effects';
import { tasksReducer } from './store/task.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TaskPageService } from './services/task-page.service';
import { AuthinterceptorService } from 'src/app/shared/services/authinterceptor/authinterceptor.service';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { ElementMenuModule } from 'src/app/shared/components/element-menu/element-menu.module';
import { FilterPipe } from './pipes/filter.pipe';
import { SortModule } from 'src/app/shared/components/sort/sort.module';
import { ContainerColorComponent } from './components/container-color/container-color.component';
import { ArchiveComponent } from './components/archive/archive/archive.component';

@NgModule({
  declarations: [
    TaskPageComponent,
    TaskComponent,
    TaskStatusPipe,
    FilterPipe,
    ContainerColorComponent,
    ArchiveComponent,
  ],
  imports: [
    CommonModule,
    TaskPageRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TaskPageEffect]),
    ModalModule,
    ReactiveFormsModule,
    ElementMenuModule,
    SortModule,
  ],
  providers: [
    TaskPageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true,
    },
  ],
})
export class TaskPageModule {}
