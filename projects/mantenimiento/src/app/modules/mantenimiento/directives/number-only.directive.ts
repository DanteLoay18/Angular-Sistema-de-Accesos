import { Directive, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appNumberOnly]',
  providers: []
})
export class NumberOnlyDirective {
  // @Input() appNumberOnly!: string;


  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
      const inputValue = (event.target as HTMLInputElement).value;
      const newValue = inputValue.replace(/[^0-9]/g, ''); // Permite solo letras (mayúsculas y minúsculas)
      (event.target as HTMLInputElement).value = newValue; // Actualiza el valor en el elemento HTM

  }

}
