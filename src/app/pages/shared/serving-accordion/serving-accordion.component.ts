import { Component, Input } from '@angular/core';
import { AccordionComponent } from '../../../ui/templates/accordion/accordion.component';
import { InstructionTypeEnum } from '../../../enums';

@Component({
  selector: 'app-serving-accordion',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './serving-accordion.component.html',
  styleUrl: './serving-accordion.component.scss'
})
export class ServingAccordionComponent {
  @Input({ required: true }) public instructions!: Record<InstructionTypeEnum, string[]>;
}
