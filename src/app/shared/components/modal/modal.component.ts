import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Input() title!: string;
  @Input() buttonText: string = 'Send';
  @Output() modalSubmit = new EventEmitter();
  @Output() modalClose = new EventEmitter();

  onSubmit(): void {
    this.modalSubmit.emit();
  }
  closeModal(): void {
    this.modalClose.emit();
  }
}
