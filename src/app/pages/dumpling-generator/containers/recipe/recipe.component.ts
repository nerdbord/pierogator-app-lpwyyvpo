import { Component, EventEmitter, Input, Output, WritableSignal, signal } from '@angular/core';
import { SectionHeaderComponent } from '../../../../ui/molecules/section-header/section-header.component';
import { DefaultInputComponent } from '../../../../ui/atoms/default-input/default-input.component';
import { DumplingRecipePostBodyInterface } from '../../../../interfaces';
import { TextareaInputComponent } from '../../../../ui/molecules/textarea-input/textarea-input.component';
import { IngredientsAccordionComponent } from '../../../shared/ingredients-accordion/ingredients-accordion.component';
import { InstructionsAccordionComponent } from '../../../shared/instructions-accordion/instructions-accordion.component';
import { ServingAccordionComponent } from '../../../shared/serving-accordion/serving-accordion.component';
import { OpenAiApiService, PierogatorApiService } from '../../../../services';

const MOCK: DumplingRecipePostBodyInterface = {
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
  @Input() public recipe: DumplingRecipePostBodyInterface = MOCK;
  @Output() public changeClicked: EventEmitter<never> = new EventEmitter<never>();
  @Output() public shareClicked: EventEmitter<DumplingRecipePostBodyInterface> =
    new EventEmitter<DumplingRecipePostBodyInterface>();

  public isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private readonly _openaiApiService: OpenAiApiService,
    private readonly _pierogatorApiService: PierogatorApiService,
  ) { }

  public handleChangeClicked(): void {
    this.changeClicked.emit();
  }

  public handleGenerateClicked(): void {
    this.isLoading.set(true);
    alert('GENERATE');
    this.isLoading.set(false);
  }
}
