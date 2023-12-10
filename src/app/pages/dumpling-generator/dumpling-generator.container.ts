import { Component, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeComponent } from './containers/recipe/recipe.component';
import { IngredientsComponent } from './containers/ingredients/ingredients.component';
import { GeneratorWorkingModeEnum } from '../../enums';
import { DumplingRecipePostBodyInterface } from '../../interfaces';
import { PierogatorApiService } from '../../services';
import { GeneratedDumplingInterface } from '../../interfaces/generated-dumpling.interface';

const MOCK: DumplingRecipePostBodyInterface = {
  "name": "DUMPLINGS_NAME_1",
  "imageSrc": "https://twoplaidaprons.com/wp-content/uploads/2020/05/Chinese-pork-dumplings-picking-up-a-dumpling-with-chopsticks.jpg",
  // "ingredients": {
  //   "dough": [
  //     {
  //       "name": "mąka",
  //       "quantity": '2'
  //     },
  //     {
  //       "name": "jajka",
  //       "quantity": '2'
  //     },
  //     {
  //       "name": "woda",
  //       "quantity": '1'
  //     },
  //     {
  //       "name": "szczypta soli",
  //       "quantity": '1'
  //     }
  //   ],
  //   "filling": [
  //     {
  //       "name": "ziemniaki",
  //       "quantity": '4'
  //     },
  //     {
  //       "name": "cebula",
  //       "quantity": '1'
  //     },
  //     {
  //       "name": "masło",
  //       "quantity": '2'
  //     },
  //     {
  //       "name": "sól",
  //       "quantity": '1'
  //     },
  //     {
  //       "name": "pieprz",
  //       "quantity": '1'
  //     }
  //   ]
  // },
  // "instructions": {
  //   "dough_preparation": [
  //     "Przesiać mąkę do dużej miski.",
  //     "Wbić jajka do miski z mąką.",
  //     "Dodać wodę i szczyptę soli.",
  //     "Wymieszać składniki i zagnieść ciasto."
  //   ],
  //   "filling_preparation": [
  //     "Obrać ziemniaki i pokroić w kostkę.",
  //     "Posiekać cebulę.",
  //     "Na rozgrzaną patelnię dodać masło.",
  //     "Wrzucić na patelnię cebulę i smażyć aż będzie miękka i lekko złotawa.",
  //     "Dodać ziemniaki na patelnię i smażyć aż będą miękkie.",
  //     "Na koniec doprawić solą i pieprzem.",
  //     "Przełożyć farsz do miseczki i ostudzić."
  //   ],
  //   "forming_and_cooking_dumplings": [
  //     "Rozwałkować ciasto na cienkie placki.",
  //     "Wycinać rondele za pomocą szklanki lub foremek.",
  //     "Na środek każdego rondla nałożyć niewielką ilość farszu.",
  //     "Złożyć pierogi na pół i dokładnie zlepić brzegi.",
  //     "Gotować pierogi w osolonym wrzątku przez 3-5 minut, aż wypłyną na powierzchnię.",
  //     "Wyjąć pierogi i odczekać chwilę, żeby odparowały."
  //   ],
  //   "serving": [
  //     "Podawać pierogi na talerzu, polewając stopionym masłem.",
  //     "Można również dodać podsmażoną cebulę i słoninę jako dodatkowe składniki."
  //   ]
  // }
}

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

  public recipe: WritableSignal<DumplingRecipePostBodyInterface> = signal(MOCK);
  public generatedDumpling: WritableSignal<GeneratedDumplingInterface> = signal({
    dough: '',
    ingredients: '',
    filling: '',
    imageUrl: '',
    name: ''
  });

  public recipe: WritableSignal<DumplingRecipePostBodyInterface> = signal(MOCK);
  public generatedDumpling: WritableSignal<GeneratedDumplingInterface> = signal({
    dough: '',
    ingredients: '',
    filling: '',
    imageUrl: '',
    name: ''
  });

  public recipe: WritableSignal<DumplingRecipePostBodyInterface> = signal(MOCK);
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

  public handleShareButtonClicked(): void {
    this._pierogatorApiService.postDumplingRecipes(this.recipe())
      .subscribe(() => {
        this._router.navigate(['/list']);
      });
  }
}
