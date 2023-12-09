import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-section-header-atom',
  standalone: true,
  imports: [NgClass],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input({required: true}) public sectionName!: string;
  @Input() public sectionNameOnRight: boolean = false;
  @Input() public buttonText: string = '';
}
