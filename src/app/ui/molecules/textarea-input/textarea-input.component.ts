import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LockButtonComponent } from '../../atoms/lock-button/lock-button.component';

@Component({
  selector: 'ui-textarea-input',
  standalone: true,
  imports: [LockButtonComponent, ReactiveFormsModule],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.scss'
})
export class TextareaInputComponent implements OnInit, OnDestroy {
  @Input() public label: string = 'Ciasto';
  @Input() public canBeLocked: boolean = false;
  @Input() public placeholder: string = 'wegańskie ciasto na pszennej mące uniwersalnej';

  @Output() public formValueChange: EventEmitter<string> = new EventEmitter<string>();

  public textareaControl: FormControl = new FormControl('')

  public isLocked: WritableSignal<boolean> = signal(false);

  private _sub$: Subscription = new Subscription();

  public ngOnInit(): void {
    this._handleValueChange()
  }

  public ngOnDestroy(): void {
    this._sub$.unsubscribe();  
  }

  public handleTextareaClick(): void {
    this._updateElementValueIfEmpty();
  }

  public handleLockButtonClick(isLocked: boolean): void {
    this._updateElementValueIfEmpty();

    if(isLocked) this.textareaControl.disable();
    else this.textareaControl.enable()

    this.isLocked.set(isLocked);
  }

  private _updateElementValueIfEmpty(): void {
    if(!this.textareaControl.value)
    this.textareaControl.setValue(this.placeholder);
  }

  private _handleValueChange(): void {
    this._sub$.add(
      this.textareaControl.valueChanges.subscribe((value: string) => {
        this.formValueChange.emit(value)
      })
    )
  }

}
