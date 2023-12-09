import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionHeaderComponent } from '../../../../ui/molecules/section-header/section-header.component';
import { DefaultInputComponent } from '../../../../ui/atoms/default-input/default-input.component';
import { DumplingRecipePostBodyInterface } from '../../../../interfaces';
import { TextareaInputComponent } from '../../../../ui/molecules/textarea-input/textarea-input.component';
import { IngredientsAccordionComponent } from '../../../shared/ingredients-accordion/ingredients-accordion.component';
import { InstructionsAccordionComponent } from '../../../shared/instructions-accordion/instructions-accordion.component';

@Component({
  selector: 'dumpling-generator-recipe',
  standalone: true,
  imports: [
    SectionHeaderComponent,
    DefaultInputComponent,
    TextareaInputComponent,
    IngredientsAccordionComponent,
    InstructionsAccordionComponent,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input() public recipe: DumplingRecipePostBodyInterface = {
    name: 'NAME',
    imageSrc: 'IMAGE',
    ingredients: {
      dough: [],
      filling: [],
    },
    instructions: {
      dough_preparation: [],
      filling_preparation: [],
      forming_and_cooking_dumplings: [],
      serving: [],
    }
  }
  @Output() public changeClicked: EventEmitter<never> = new EventEmitter<never>();
  @Output() public shareClicked: EventEmitter<DumplingRecipePostBodyInterface> =
    new EventEmitter<DumplingRecipePostBodyInterface>();
}
