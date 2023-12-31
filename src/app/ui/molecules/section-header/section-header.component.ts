import { NgClass, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderComponent } from '../../atoms/loader/loader.component';

@Component({
  selector: 'ui-section-header-molecule',
  standalone: true,
  imports: [NgClass, LoaderComponent, NgOptimizedImage, NgStyle],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input({ required: true }) public sectionName!: string;
  @Input() public buttonWidth = '80px';
  @Input() public isLoading: boolean = false;
  @Input() public sectionNameOnRight: boolean = false;
  @Input() public buttonText: string = '';
  @Output() public buttonClicked: EventEmitter<never> = new EventEmitter<never>();
}
