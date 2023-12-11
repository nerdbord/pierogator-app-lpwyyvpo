import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionHeaderComponent } from '../../ui/molecules/section-header/section-header.component';
import { DumplingRecipePostBodyInterface, DumplingRecipesByIdResponseInterface } from '../../interfaces';
import { DefaultInputComponent } from '../../ui/atoms/default-input/default-input.component';
import { TextareaInputComponent } from '../../ui/molecules/textarea-input/textarea-input.component';
import { IngredientsAccordionComponent } from '../shared/ingredients-accordion/ingredients-accordion.component';
import { InstructionsAccordionComponent } from '../shared/instructions-accordion/instructions-accordion.component';
import { ServingAccordionComponent } from '../shared/serving-accordion/serving-accordion.component';
import { PierogatorApiService } from '../../services';

@Component({
  selector: 'page-dumpling-details',
  standalone: true,
  imports: [
    SectionHeaderComponent,
    DefaultInputComponent,
    TextareaInputComponent,
    IngredientsAccordionComponent,
    InstructionsAccordionComponent,
    ServingAccordionComponent,
  ],
  templateUrl: './dumpling-details.container.html',
  styleUrl: './dumpling-details.container.scss'
})
export class DumplingDetailsComponent {
  public recipe: DumplingRecipePostBodyInterface = {
    name: '',
    imageSrc: '',
    ingredients: {
      dough: [],
      filling: [],
    },
    instructions: {
      dough_preparation: [],
      filling_preparation: [],
      forming_and_cooking_dumplings: [],
      serving: [],
    },
  };

  private readonly _dumplingsId: string = this._route.snapshot.paramMap.get('dumplingId') as string;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _pierogatorApiService: PierogatorApiService,
  ) {
    this._getDumplings();
  }

  public handleBackClicked(): void {
    this._router.navigate(['/list']);
  }

  private _getDumplings(): void {
    this._pierogatorApiService
      .getDumplingRecipeById(this._dumplingsId)
      .subscribe(({ recipe }: DumplingRecipesByIdResponseInterface) => {
        this.recipe.name = recipe.name;
        this.recipe.imageSrc = recipe.imageSrc;
        this.recipe.ingredients = recipe.ingredients;
        this.recipe.instructions = recipe.instructions;
      });
  }
}
