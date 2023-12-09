import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-dumpling-item',
  standalone: true,
  imports: [],
  templateUrl: './dumpling-item.component.html',
  styleUrl: './dumpling-item.component.scss'
})
export class DumplingItemComponent {
  @Input() public includeMangeButtons: boolean = false;
  @Input() public name: string = 'Piróg papiróg';
  @Input() public image: string = '/assets/pierog.png';

  @Output() public openClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public deleteClick: EventEmitter<void> = new EventEmitter<void>();
}
