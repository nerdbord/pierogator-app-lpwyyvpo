import {Component, EventEmitter, inject, Input, Output, signal, WritableSignal} from '@angular/core';
import {DefaultInputComponent} from '../../../../ui/atoms/default-input/default-input.component';
import {TextareaInputComponent} from '../../../../ui/molecules/textarea-input/textarea-input.component';
import {SectionHeaderComponent} from '../../../../ui/molecules/section-header/section-header.component';
import {OpenAiApiService} from '../../../../services';
import {AiModelEnum, AiRoleEnum} from '../../../../enums';
import {ChatCompletionPostBodyInterface, ImageGenerationPostBodyInterface, DumplingDescriptionInterface, GeneratedDumplingInterface} from '../../../../interfaces';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'dumpling-generator-ingredients',
    standalone: true,
    imports: [TextareaInputComponent, SectionHeaderComponent, DefaultInputComponent],
    templateUrl: './ingredients.component.html',
    styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
    @Input()
    public set dumpling(dumpling: GeneratedDumplingInterface) {
        this.dumplingDescription.set({
            dough: dumpling.dough,
            ingredients: dumpling.ingredients,
            filling: dumpling.filling
        })
        this.dumplingName.set(dumpling.name);
        this.dumplingImageUrl.set(dumpling.imageUrl);
    }

    @Output() public dumplingSaved: EventEmitter<GeneratedDumplingInterface> = new EventEmitter<GeneratedDumplingInterface>();

    public areIngredientsGenerating: WritableSignal<boolean> = signal(false);
    public isImageLoading: WritableSignal<boolean> = signal(false);
    public dumplingName: WritableSignal<string> = signal('');

    public dumplingDescription: WritableSignal<DumplingDescriptionInterface> = signal({
        dough: '',
        ingredients: '',
        filling: ''
    });

    public dumplingImageUrl: WritableSignal<string> = signal('');

    private _openAiApiService: OpenAiApiService = inject(OpenAiApiService);

    public handleDumplingSave(): void {
        this.dumplingSaved.emit({
            ...this.dumplingDescription(),
            imageUrl: this.dumplingImageUrl(),
            name: this.dumplingName()
        })
    }

    public generateIngredients(): void {
        this.areIngredientsGenerating.set(true);
        const doughBody: ChatCompletionPostBodyInterface = {
            model: AiModelEnum.GPT_TURBO,
            messages: [
                {
                    role: AiRoleEnum.USER,
                    content: `Opisz mi proszę ciasto na pieroga.
           Opis zawsze musi zawierać informację dotyczące konsystencji tego ciasta, jego wyglądu oraz składniki potrzebne do jego wykonania.
           Ciasto powinno być w jakiś sposób unikalne, nie korzystaj z gotowych przepisów.
           Ciasto może być zarówno słodkie jak i słone.
           Dodatkowo niech opis zawiera się w jednym krótkim zdaniu.
           Nie dodawaj żadnych dodatkowych treści po za opisem ciasta.
           Niech będzie to string opakowany w "".         
           `
                }
            ]
        }
        const fillingBody: ChatCompletionPostBodyInterface = {
            model: AiModelEnum.GPT_TURBO,
            messages: [
                {
                    role: AiRoleEnum.USER,
                    content: `Opisz mi proszę farsz na pierogi.
           Opis zawsze musi zawierać informację dotyczące składników oraz smaku farszu.
           Farsz powinien być w jakiś sposób unikalny, nie korzystaj z gotowych przepisów.
           Farsz może być zarówno słodki jak i słony. 
           Dodatkowo niech opis zawiera się w jednym krótkim zdaniu.
           Nie dodawaj żadnych dodatkowych treści po za opisem farszu.
           Niech będzie to string opakowany w "".         
           `

                }
            ]
        }

        forkJoin({
            dough: this._openAiApiService.postChatCompletionWithoutSchema(doughBody),
            filling: this._openAiApiService.postChatCompletionWithoutSchema(fillingBody)
        }).subscribe(({dough, filling}) => {
            const doughMessage = this._replaceMessageBrackets(dough.choices.at(0)?.message.content as string);
            const fillingMessage = this._replaceMessageBrackets(filling.choices.at(0)?.message.content as string);


            const ingredientsBody: ChatCompletionPostBodyInterface = {
                model: AiModelEnum.GPT_TURBO,
                messages: [
                    {
                        role: AiRoleEnum.USER,
                        content: `
            Przygotuj mi listę składników oddzielony przecinkami na podstawie podanych opisów ciasta i farszu.${doughMessage}.${fillingMessage}.
            Ważne aby wiadomość nie zawierała żadnych dodatkowych informacji. Mają to być składniki oddzielone przecinkami.
            Wiadomość musi być stringiem opakowanym w ""
            `

                    }
                ]
            }

            this._openAiApiService.postChatCompletionWithoutSchema(ingredientsBody).subscribe((ingredients) => {
                this.dumplingDescription.update((dumpling) => ({
                    ingredients: this._replaceMessageBrackets(ingredients.choices.at(0)?.message.content as string),
                    filling: this._replaceMessageBrackets(filling.choices.at(0)?.message.content as string),
                    dough: this._replaceMessageBrackets(dough.choices.at(0)?.message.content as string)
                }))
                this.areIngredientsGenerating.set(false);
            })
        })
    }

    public generateImageAndName(): void {
        this.isImageLoading.set(true);


        const nameBody: ChatCompletionPostBodyInterface = {
            model: AiModelEnum.GPT_TURBO,
            messages: [
                {
                    role: AiRoleEnum.USER,
                    content: `Proszę o wygenerowanie nazwy przepisu na pierogi. 
          Nazwa nie powinna zawierać w sobie żadnych składników i być możliwe abstrakcyjna.
          Wzoruj się na takich nazwach jak: Super pierogi, Piróg papiróg, Przysmażane marzenia pierogowe, Szpinakowe pyszności, Wielki pieróg życia, Pierogowa fantazja, Pierogowy cud
          Proponowane nazwy nie są obligatoryjne. Są to tylko nazwy poglądowe, które mają pomóc Ci w przygotowaniu nowej nazwy.
          Nazwy nie mogą się powtarzać i muszą zawierać nazwę polskiej odmiany piergów. Żadne Ravioli czy Chaczaprui.
          Nazwa powinna być po polsku i mieć maksymalnie 40 znaków. A odpowiedź musi być stringiem opakowanym w ""`
                }
            ]
        }

        const getImagePromptBody: ChatCompletionPostBodyInterface = {
            model: AiModelEnum.GPT_TURBO,
            messages: [
                {
                    role: AiRoleEnum.USER,
                    content: this._prepareImagePrompt()
                },
            ]
        }

        if (this.dumplingDescription().dough || this.dumplingDescription().filling) {
            getImagePromptBody.messages.push({
                role: AiRoleEnum.USER,
                content: `Proszę aby prompt zawierał informacje która pozwoli na wygenerowanie zdjęcia pasującego do tych opisów: ${this.dumplingDescription().dough}. ${this.dumplingDescription().filling}.
                Odpowiedź musi być stringiem opakowanym w "". Dodatkowo obrazek musi spełniać warunki podane w opisie oraz przypominać kształtem tradycyjne polskie danie o nazwie pierogi i odnosić się do tematyki kulinarnej. 
          `
            })
        }


        this._openAiApiService.postChatCompletionWithoutSchema(getImagePromptBody).subscribe((body) =>{
          const imageBody: ImageGenerationPostBodyInterface = {
            prompt: this._replaceMessageBrackets(body.choices.at(0)?.message.content as string),
            n: 1,
            size: `${1024}x${1024}`
          }

          forkJoin({
            image: this._openAiApiService.postImageGeneration(imageBody),
            name: this._openAiApiService.postChatCompletionWithoutSchema(nameBody)
          }).subscribe(({image, name}) => {
            this.dumplingImageUrl.set(this._replaceMessageBrackets(image.data.at(0)?.url as string));
            this.dumplingName.set(this._replaceMessageBrackets(name.choices.at(0)?.message.content as string))
          })
        })
    }

    private _prepareImagePrompt(): string {
        return `Przygotuj prompt, który pozwoli na wygenerowanie zdjęcia pierogów. 
      Pieróg to tradycyjne danie kuchni polskiej, które składa się z ciasta i farszu. 
      Ciasto jest delikatne i elastyczne. 
      Jest cienko rozwałkowane i ma kształt półokrągły.
      Farsz jest umieszczony w środku ciasta. 
      Może składać się z różnych składników.
      Pierogi są delikatne, ale jednocześnie mają sprężystą konsystencję.
      Pierogi są podawane na dużym, płaskim talerzu. 
      Prompt który zwrócisz ma mieć maksymalnie 1000 znaków.
      `
    }

    private _replaceMessageBrackets(message: string): string {
      return message.replaceAll('"', '');
    }
}
