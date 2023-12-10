import { Component, Input } from '@angular/core';
import { AccordionComponent } from '../../../ui/templates/accordion/accordion.component';
import { DumplingRecipeIngredientInterface } from '../../../interfaces';
import { IngredientTypeEnum } from '../../../enums';

@Component({
  selector: 'app-ingredients-accordion',
  standalone: true,
  imports: [AccordionComponent],
  templateUrl: './ingredients-accordion.component.html',
  styleUrl: './ingredients-accordion.component.scss'
})
export class IngredientsAccordionComponent {
  @Input({ required: true }) public ingredients!: Record<IngredientTypeEnum, DumplingRecipeIngredientInterface[]>;
  public IngredientTypeEnum = IngredientTypeEnum;
}
