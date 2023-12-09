import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from './ui/layouts/page-layout/page-layout.component';
import { AccordionComponent } from './ui/templates/accordion/accordion.component';
import { SectionHeaderComponent } from './ui/atoms/section-header/section-header.component';
import { TextareaInputComponent } from './ui/molecules/textarea-input/textarea-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PageLayoutComponent, AccordionComponent, SectionHeaderComponent, TextareaInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pierogator';
}
