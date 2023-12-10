import { Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { finalize } from 'rxjs';

import { SectionHeaderComponent } from '../../../../ui/molecules/section-header/section-header.component';
import { DefaultInputComponent } from '../../../../ui/atoms/default-input/default-input.component';
import { ChatCompletionResponseInterface, DumplingRecipePostBodyInterface, DumplingRecipesResponseInterface } from '../../../../interfaces';
import { TextareaInputComponent } from '../../../../ui/molecules/textarea-input/textarea-input.component';
import { IngredientsAccordionComponent } from '../../../shared/ingredients-accordion/ingredients-accordion.component';
import { InstructionsAccordionComponent } from '../../../shared/instructions-accordion/instructions-accordion.component';
import { ServingAccordionComponent } from '../../../shared/serving-accordion/serving-accordion.component';
import { OpenAiApiService } from '../../../../services';
import { AiModelEnum, AiRoleEnum } from '../../../../enums';

@Component({
  selector: 'dumpling-generator-recipe',
  standalone: true,
  imports: [
    SectionHeaderComponent,
    DefaultInputComponent,
    TextareaInputComponent,
    IngredientsAccordionComponent,
    InstructionsAccordionComponent,
    ServingAccordionComponent,
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  @Input({ required: true }) public recipe!: DumplingRecipePostBodyInterface;
  @Output() public recipeChange: EventEmitter<DumplingRecipePostBodyInterface> =
    new EventEmitter<DumplingRecipePostBodyInterface>();
  @Output() public changeClicked: EventEmitter<never> = new EventEmitter<never>();
  @Output() public shareClicked: EventEmitter<never> = new EventEmitter<never>();

  public isLoading: WritableSignal<boolean> = signal(false);
  public dumplingsTips: WritableSignal<string> = signal('');

  constructor(private readonly _openaiApiService: OpenAiApiService) { }

  public handleChangeClicked(): void {
    this.changeClicked.emit();
  }

  public handleTipsChanged(value: string): void {
    this.dumplingsTips.set(value);
  }

  public handleGenerateClicked(): void {
    this.isLoading.set(true);

    this._openaiApiService.postChatCompletion({
      model: AiModelEnum.GPT_TURBO,
      messages: [
        {
          role: AiRoleEnum.USER,
          content: `Wygeneruj przepis na piergogi. ${this.dumplingsTips()}`,
        }
      ]
    })
      .pipe(finalize(() => {
        this.isLoading.set(false);
      }))
      .subscribe((response: ChatCompletionResponseInterface) => {
        const parsedMessage: DumplingRecipesResponseInterface = this._openaiApiService.getParsedMessage(response.choices[0]);
        this.recipe.ingredients = parsedMessage.recipes[0].ingredients;
        this.recipe.instructions = parsedMessage.recipes[0].instructions;
        this.recipeChange.emit(this.recipe);
      })
  }
}
