import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iStatus } from 'src/app/shared/interfaces/task.interface';
import { changeContainerColorAction } from '../../store/task.actions';
import { Color } from '../../types/tasks.types';

@Component({
  selector: 'app-container-color',
  templateUrl: './container-color.component.html',
  styleUrls: ['./container-color.component.scss'],
})
export class ContainerColorComponent implements OnInit {
  @Input() value: string | undefined = '#ffffff';
  @Input() dashboardId!: string;
  @Input() containerType!: iStatus;

  constructor(private store: Store) {}

  ngOnInit(): void {}
  changeColor(event: Event) {
    const colorValue = (event.target as HTMLInputElement)?.value;
    this.store.dispatch(
      changeContainerColorAction({
        dashboardId: this.dashboardId,
        containerType: this.containerType,
        color: { color: colorValue },
      })
    );
  }
}
