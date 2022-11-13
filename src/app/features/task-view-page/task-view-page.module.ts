import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskViewPageComponent } from './task-view-page.component';
import { TaskViewPageRoutingModule } from './task-view-page-routing.module';
import { TaskViewPageService } from './services/task-view-page.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './store/task-view-page.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TaskViewPageEffect } from './store/task-view-page.effects';
import { AuthinterceptorService } from 'src/app/shared/services/authinterceptor/authinterceptor.service';
import { CommentComponent } from './components/comment/comment.component';
import { CommentAddComponent } from './components/comment-add/comment-add.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskViewPageComponent,
    CommentComponent,
    CommentAddComponent
  ],
  imports: [
    CommonModule, 
    TaskViewPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('task', taskReducer),
    EffectsModule.forFeature([TaskViewPageEffect]),
  ],
  providers: [
    TaskViewPageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }
  ]
})
export class TaskViewPageModule { }
