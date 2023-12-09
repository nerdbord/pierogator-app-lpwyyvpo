import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, Signal, WritableSignal, computed, signal } from '@angular/core';

@Component({
  selector: 'ui-lock-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './lock-button.component.html',
  styleUrl: './lock-button.component.scss'
})
export class LockButtonComponent {
  @Output() public buttonClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isLocked: WritableSignal<boolean> = signal(false);

  public iconPath: Signal<string> = computed(() => (`/assets/icons/${this.isLocked() ? 'locked' : 'unlocked'}.svg`))

  public handleButtonClick(): void {
    this.isLocked.update((currentState) => !currentState);
    this.buttonClick.emit(this.isLocked());
  }
}
