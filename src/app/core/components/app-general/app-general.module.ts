import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppGeneralContenedorPrincipalComponent } from './app-general-contenedor-principal/app-general-contenedor-principal.component';
import { AppGeneralFooterComponent } from './app-general-footer/app-general-footer.component';
import { SharedModule } from 'ngx-sigape';



@NgModule({
  declarations: [
    AppGeneralContenedorPrincipalComponent,
    AppGeneralFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    AppGeneralContenedorPrincipalComponent,
    AppGeneralFooterComponent
  ]
})
export class AppGeneralModule { }
