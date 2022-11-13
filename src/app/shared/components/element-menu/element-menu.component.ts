import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-element-menu',
  templateUrl: './element-menu.component.html',
  styleUrls: ['./element-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementMenuComponent {
  isVisible: boolean = false;
  @HostBinding('class') hostClass: string = 'hidden';
  @HostListener('window:click', ['$event']) windowClick(event: Event) {
    if (this.isVisible) {
      this.toggle(event);
    }
  }

  toggle(event: Event): void {
    event.stopPropagation();
    if (this.isVisible) {
      this.hostClass = 'hidden';
      this.isVisible = false;
    } else {
      this.hostClass = '';
      this.isVisible = true;
    }
  }

  menuClick(event: Event): void {
    this.toggle(event);
    event.stopPropagation();
  }
}
