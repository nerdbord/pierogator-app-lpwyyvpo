import { Component, Input } from '@angular/core';
import { AccordionComponent } from '../../../ui/templates/accordion/accordion.component';
import { InstructionTypeEnum } from '../../../enums';

@Component({
  selector: 'app-instructions-accordion',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './instructions-accordion.component.html',
  styleUrl: './instructions-accordion.component.scss'
})
export class InstructionsAccordionComponent {
  @Input({ required: true }) public instructions!: Record<InstructionTypeEnum, string[]>;
  public InstructionTypeEnum = InstructionTypeEnum;
}
