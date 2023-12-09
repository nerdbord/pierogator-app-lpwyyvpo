import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ui-default-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.scss'
})
export class DefaultInputComponent implements OnInit, OnDestroy {
  @Input() public label: string = 'Ciasto';

  @Input() public set isDisabled(value: boolean) {
    if(value) this.inputControl.disable();
    else this.inputControl.enable();
  }

  @Output() public formValueChange: EventEmitter<string> = new EventEmitter<string>();

  public inputControl: FormControl = new FormControl('')

  private _sub$: Subscription = new Subscription();

  public ngOnInit(): void {
    this._handleValueChange()
  }

  public ngOnDestroy(): void {
    this._sub$.unsubscribe();  
  }

  private _handleValueChange(): void {
    this._sub$.add(
      this.inputControl.valueChanges.subscribe((value: string) => {
        console.log(value);
        this.formValueChange.emit(value)
      })
    )
  }

}
