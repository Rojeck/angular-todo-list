import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Comment } from 'src/app/shared/interfaces/task.interface';
import { deleteCommentAction } from '../../store/task-view-page.actions';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() subject!: Comment;
  @Input() dashboardId!: string;
  @Input() taskId!: string;
  constructor(private store: Store) {}
  date!: Date;
  text!: string;

  ngOnInit(): void {
    this.date = this.subject.created_at;
    this.text = this.subject.text;
  }
  deleteComment() {
    this.store.dispatch(
      deleteCommentAction({
        dashboardId: this.dashboardId,
        commentId: this.subject._id,
        taskId: this.taskId,
      })
    );
  }
}
