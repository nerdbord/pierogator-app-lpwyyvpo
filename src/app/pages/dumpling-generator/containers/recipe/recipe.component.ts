import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { finalize, retry } from 'rxjs';
import { SectionHeaderComponent } from '../../../../ui/molecules/section-header/section-header.component';
import { DefaultInputComponent } from '../../../../ui/atoms/default-input/default-input.component';
import { ChatCompletionResponseInterface, DumplingRecipePostBodyInterface, DumplingRecipesResponseInterface } from '../../../../interfaces';
import { TextareaInputComponent } from '../../../../ui/molecules/textarea-input/textarea-input.component';
import { IngredientsAccordionComponent } from '../../../shared/ingredients-accordion/ingredients-accordion.component';
import { InstructionsAccordionComponent } from '../../../shared/instructions-accordion/instructions-accordion.component';
import { ServingAccordionComponent } from '../../../shared/serving-accordion/serving-accordion.component';
import { OpenAiApiService } from '../../../../services';
import { AiModelEnum, AiRoleEnum } from '../../../../enums';
import { GeneratedDumplingInterface } from '../../../../interfaces/generated-dumpling.interface';

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
export class RecipeComponent implements OnInit {
  @Input({ required: true }) public generatedDumpling!: GeneratedDumplingInterface;
  @Output() public changeClicked: EventEmitter<never> = new EventEmitter<never>();
  @Output() public shareClicked: EventEmitter<DumplingRecipePostBodyInterface> =
    new EventEmitter<DumplingRecipePostBodyInterface>();

  public recipe: DumplingRecipePostBodyInterface = {
    name: '',
    imageSrc: '',
  };
  public isLoading: WritableSignal<boolean> = signal(false);
  public dumplingsTips: WritableSignal<string> = signal('');
  public isRecipeGenerated: WritableSignal<boolean> = signal(false);

  constructor(private readonly _openaiApiService: OpenAiApiService) { }

  public ngOnInit(): void {
    this.recipe.name = this.generatedDumpling.name;
    this.recipe.imageSrc = this.generatedDumpling.imageUrl;
  }

  public handleChangeClicked(): void {
    this.changeClicked.emit();
  }

  public handleTipsChanged(value: string): void {
    this.dumplingsTips.set(value);
  }

  public handleGenerateClicked(): void {
    this.isLoading.set(true);

    const doughTipsMessage: string = `Zależy mi także na wykorzystaniu tych wskazówek odnośnie ciasta: "${this.generatedDumpling.dough}."`;
    const fillingTipsMessage: string = `Zależy mi także na wykorzystaniu tych wskazówek odnośnie farszu: "${this.generatedDumpling.filling}."`;
    const ingredientsTipsMessage: string = `Uwzględnij proszę wszystkie podane składniki: "${this.generatedDumpling.ingredients}."`;

    this._openaiApiService.postChatCompletion({
      model: AiModelEnum.GPT_TURBO,
      messages: [
        {
          role: AiRoleEnum.USER,
          content: `
          Cześć, pracuj przez chwilę jako kucharz, który opisuje swoje oryginalne pierogi gościom restauracji. 
            Opisz mi proszę tego pieroga, powiedz krótko o jego cieście i sposobie jego przygotowania, 
            farszu i sposobie jego przygotowania,składnikach oraz opisz sposób podania.
            Niech ten pieróg będzie czymś, czego jeszcze nie jedli.
            Pieróg może być zarówno w formie słodkiej jak i słonej.
            Przy informowaniu o składnikach nie dodawaj treści w stylu "Składniki potrzebne do ciasta to:". 
            Wylistuj po przecinku składniki potrzebne do stworzenia ciasta i farszu.
            Dodatkowo nie dodawaj informacji w stylu "Krótki opis" do swojej odpowiedzi.
            Zależy mi, aby wiadomość była tylko i wyłącznie w formacie podanym wyżej. 
            Bez żadnego innego tekstu. Oraz niech odpowiedź będzie zawsze w języku polskim
            Wykorzystaj podane wskazówki: ${this.dumplingsTips()}.
            ${this.generatedDumpling.dough ? doughTipsMessage : ''}
            ${this.generatedDumpling.filling ? fillingTipsMessage : ''}
            ${this.generatedDumpling.ingredients ? ingredientsTipsMessage : ''}
            Wartość którą zwrócisz ma wpasowywać się w format podany wcześniej, oraz zawsze możliwa do przeprasowania przy użyciu JSON.parse
          `,
        }
      ]
    })
      .pipe(
        retry(3),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((response: ChatCompletionResponseInterface) => {
        const parsedMessage: DumplingRecipesResponseInterface = this._openaiApiService.getParsedMessage(response.choices[0]);
        this.recipe.ingredients = parsedMessage.recipes[0].ingredients;
        this.recipe.instructions = parsedMessage.recipes[0].instructions;
        this.isRecipeGenerated.set(true);
      })
  }
}
