import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  @Output() sortTypeChanged = new EventEmitter();
  @Output() sortByChanged = new EventEmitter();
  @Output() filterChanged = new EventEmitter();
  @Input() sortTypeValue!: 'ASC' | 'DESC' | null;
  @Input() sortByValue!: string | null;

  sortTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortTypeChanged.emit(target.value);
  }
  sortByChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortByChanged.emit(target.value);
  }
  filterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterChanged.emit(target.value);
  }
}
