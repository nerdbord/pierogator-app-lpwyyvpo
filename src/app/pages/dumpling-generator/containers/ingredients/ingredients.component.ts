import { Component, EventEmitter, Output, WritableSignal, inject, signal } from '@angular/core';
import { DefaultInputComponent } from '../../../../ui/atoms/default-input/default-input.component';
import { TextareaInputComponent } from '../../../../ui/molecules/textarea-input/textarea-input.component';
import { SectionHeaderComponent } from '../../../../ui/molecules/section-header/section-header.component';
import { OpenAiApiService } from '../../../../services';
import { AiModelEnum, AiRoleEnum } from '../../../../enums';
import { ChatCompletionPostBodyInterface, ChatCompletionResponseInterface, ImageGenerationPostBodyInterface, ImageGenerationResponseInterface } from '../../../../interfaces';
import { DumplingDescriptionInterface } from '../../../../interfaces/dumpling-description.interface';
import { JsonPipe } from '@angular/common';
import { GeneratedDumplingInterface } from '../../../../interfaces/generated-dumpling.interface';

@Component({
  selector: 'dumpling-generator-ingredients',
  standalone: true,
  imports: [TextareaInputComponent, SectionHeaderComponent, DefaultInputComponent, JsonPipe],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
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

    const body: ChatCompletionPostBodyInterface = {
      model: AiModelEnum.GPT_TURBO,
      messages: [
        {
          role: AiRoleEnum.USER,
          content: `Cześć, pracuj przez chwilę jako aplikacja, która pozwala na generowanie różnych pierogów. 
          Wygeneruj mi proszę informacje o pierogu który nie istnieje, jednak jest możliwy do stworzenia w realnym świecie. 
          Może być to zarówno w formie słodkiej jak i słonej.
          Zależy mi, aby wiadomość była tylko i wyłącznie w formacie podanym wyżej. 
          Bez żadnego innego tekstu. Oraz niech odpowiedź będzie zawsze w języku polskim`
        }
      ]
    }

    this._openAiApiService.postChatCompletionForDumplingDesc(body).subscribe((res: ChatCompletionResponseInterface) => {
      this.dumplingDescription.set(JSON.parse(res.choices.at(0)?.message.content as string));
      this.areIngredientsGenerating.set(false);
    })
  }

  public generateImage(): void {
    this.isImageLoading.set(true);
    const body: ImageGenerationPostBodyInterface = {
      prompt: `
      Stwórz jedno realistyczne zdjęcie polskiego pieroga. Na zdjęciu ma znaleźc się sam pieróg, nie ma zawierać tekstu, grafik, innych obrazków czy znaków.
      Zdjęcie wygeneruj na podstawie poniższych informacji dotyczących ciasta, farszu oraz składników z jakich pieróg jest przygotowany.
      Ciasto:${this.dumplingDescription().dough}.
      Farsz:${this.dumplingDescription().filling}.
      Składniki:${this.dumplingDescription().ingredients}.
     `,
      n: 1,
      size: `${1024}x${1024}`
    }

    this._openAiApiService.postImageGeneration(body).subscribe((res: ImageGenerationResponseInterface) => {
      this.isImageLoading.set(false);
      this.dumplingImageUrl.set(res.data.at(0)?.url || '')
    })
  }
}
