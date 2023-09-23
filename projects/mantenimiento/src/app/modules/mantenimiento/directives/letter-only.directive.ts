import { Directive, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appLetterOnly]',
  providers: []
})
export class LetterOnlyDirective {
  @Input() appLetterOnly!: string;


  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    if(this.appLetterOnly==='nombre'){
      const inputValue = (event.target as HTMLInputElement).value;
      const newValue = inputValue.replace(/[^a-zA-Z]/g, ''); // Permite solo letras (mayúsculas y minúsculas)
      (event.target as HTMLInputElement).value = newValue; // Actualiza el valor en el elemento HTM
    }else if(this.appLetterOnly==='icono' || this.appLetterOnly==="url"){
      const inputValue = (event.target as HTMLInputElement).value;
      const newValue = inputValue.replace(/[^a-zA-Z_]/g, ''); // Permite letras (mayúsculas y minúsculas) y guiones bajos
      (event.target as HTMLInputElement).value = newValue;

    }

  }

}
