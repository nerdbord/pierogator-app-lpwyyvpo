import { Component, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeComponent } from './containers/recipe/recipe.component';
import { IngredientsComponent } from './containers/ingredients/ingredients.component';
import { GeneratorWorkingModeEnum } from '../../enums';
import { DumplingRecipePostBodyInterface } from '../../interfaces';
import { PierogatorApiService } from '../../services';
import { GeneratedDumplingInterface } from '../../interfaces/generated-dumpling.interface';

@Component({
  selector: 'page-dumpling-generator',
  standalone: true,
  imports: [RecipeComponent, IngredientsComponent],
  templateUrl: './dumpling-generator.container.html',
  styleUrl: './dumpling-generator.container.scss'
})
export class DumplingGeneratorComponent {
  public currentWorkingMode: WritableSignal<GeneratorWorkingModeEnum> =
    signal(GeneratorWorkingModeEnum.INGREDIENTS);

  public generatedDumpling: WritableSignal<GeneratedDumplingInterface> = signal({
    dough: '',
    ingredients: '',
    filling: '',
    imageUrl: '',
    name: ''
  });

  public readonly GeneratorWorkingModeEnum = GeneratorWorkingModeEnum;

  constructor(
    private readonly _pierogatorApiService: PierogatorApiService,
    private readonly _router: Router,
  ) { }

  public handleChangeButtonClicked(): void {
    this.currentWorkingMode.set(GeneratorWorkingModeEnum.INGREDIENTS);
  }

  public handleDumplingSave(dumpling: GeneratedDumplingInterface): void {
    this.generatedDumpling.set(dumpling);
    this.currentWorkingMode.set(GeneratorWorkingModeEnum.RECIPE);
  }

  public handleShareButtonClicked(recipe: DumplingRecipePostBodyInterface): void {
    this._pierogatorApiService.postDumplingRecipes(recipe)
      .subscribe(() => {
        this._router.navigate(['/list']);
      });
  }
}
