import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[autosize]',
  standalone: true
})
export class TextareaAutosizeDirective {
 @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust(textArea);
  }

  constructor(public element: ElementRef) {
  }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  adjust(textArea?: HTMLTextAreaElement): void {
    textArea = textArea || this.element.nativeElement;

    if(textArea) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }

}
