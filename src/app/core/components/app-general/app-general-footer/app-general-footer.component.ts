import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-general-footer',
  templateUrl: './app-general-footer.component.html',
  styleUrls: ['./app-general-footer.component.scss']
})
export class AppGeneralFooterComponent {
  @Input() loading!: boolean;

   private router = inject(Router)



  handleRegresar=()=>{
    this.router.navigate(['/']);
  };
}
