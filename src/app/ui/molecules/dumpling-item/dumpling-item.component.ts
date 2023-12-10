import { NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-dumpling-item-molecule',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './dumpling-item.component.html',
  styleUrl: './dumpling-item.component.scss'
})
export class DumplingItemComponent {
  @Input({required: true}) public name!: string;
  @Input({required: true}) public image!: string;
  
  @Input() public includeMangeButtons: boolean = false;
 
  @Output() public openClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() public deleteClick: EventEmitter<void> = new EventEmitter<void>();
}
