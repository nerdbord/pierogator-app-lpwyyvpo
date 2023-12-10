import { NgClass } from '@angular/common';
import { Component, Input, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'ui-accordion-template',
  standalone: true,
  imports: [NgClass],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {
  @Input({ required: true }) public label!: string;
  public isExpanded: WritableSignal<boolean> = signal(false);
}
