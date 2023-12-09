import { Component, WritableSignal, signal } from '@angular/core';
import { RecipeComponent } from './containers/recipe/recipe.component';
import { IngredientsComponent } from './containers/ingredients/ingredients.component';
import { GeneratorWorkingModeEnum } from '../../enums';

@Component({
  selector: 'page-dumpling-generator',
  standalone: true,
  imports: [RecipeComponent, IngredientsComponent],
  templateUrl: './dumpling-generator.container.html',
  styleUrl: './dumpling-generator.container.scss'
})
export class DumplingGeneratorComponent {
  public currentWorkingMode: WritableSignal<GeneratorWorkingModeEnum> =
    signal(GeneratorWorkingModeEnum.RECIPE);

  public readonly GeneratorWorkingModeEnum = GeneratorWorkingModeEnum;
}
