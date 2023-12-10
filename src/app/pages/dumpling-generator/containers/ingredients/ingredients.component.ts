import { Component } from '@angular/core';
import { DefaultInputComponent } from '../../../../ui/atoms/default-input/default-input.component';
import { TextareaInputComponent } from '../../../../ui/molecules/textarea-input/textarea-input.component';
import { SectionHeaderComponent } from '../../../../ui/molecules/section-header/section-header.component';

@Component({
  selector: 'dumpling-generator-ingredients',
  standalone: true,
  imports: [TextareaInputComponent, SectionHeaderComponent, DefaultInputComponent],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {

}
