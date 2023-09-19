import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appLetterOnly]'
})
export class LetterOnlyDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const newValue = inputValue.replace(/[^a-zA-Z]/g, ''); // Permite solo letras (mayúsculas y minúsculas)
    (event.target as HTMLInputElement).value = newValue;
  }

}
