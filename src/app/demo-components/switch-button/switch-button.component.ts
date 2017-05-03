import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchButtonComponent),
      multi: true
    }
  ]
})
export class SwitchButtonComponent implements ControlValueAccessor {

  @Input() value = true;

  disabled = false;

  switch() {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouch();
  }

  getLabel() {
    return this.value ? 'On' : 'Off';
  }

  writeValue(obj: any): void {
    console.log('writeValue', obj);
    this.value = obj;
  }

  onChange(obj: any) {
    console.log('onChanged');
  };

  onTouch() {
    console.log('onTouched');
  };

  registerOnChange(fn: any): void {
    console.log('registerOnChange', fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched', fn);
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('setDisabledState', isDisabled);
    this.disabled = isDisabled;
  }

}
