import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { postCommentAction } from '../../store/task-view-page.actions';
import { commentBackEndErrorSelector } from '../../store/task-view-page.selectors';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent implements OnInit {
  @Input() taskId!: string
  @Input() dashboardId!: string

  constructor(private store: Store) { }
  isValidationError: boolean = false;
  backEndError!: Observable<boolean | null> 
  commentForm!: FormGroup;
 
  ngOnInit(): void {
    this.backEndError = this.store.select(commentBackEndErrorSelector);
    this.createForm();
  }
  private createForm(){
    this.commentForm = new FormGroup({
      text: new FormControl(null, [
        Validators.minLength(6),
        Validators.maxLength(150),
        Validators.required,
      ])
    })
  }
  private checkError():boolean {
    if(this.commentForm.get('text')?.errors) {
      this.isValidationError = true;
      return false
    } else {
      this.isValidationError = false
      return true
    }
    
  }
  postComment():void{
    if(this.checkError()){
      this.store.dispatch(postCommentAction({
        dashboardId: this.dashboardId,
        taskId: this.taskId,
        data: this.commentForm.value
      }))
      this.commentForm.reset();
    } else {
      this.isValidationError = true;
    }
  }
}
