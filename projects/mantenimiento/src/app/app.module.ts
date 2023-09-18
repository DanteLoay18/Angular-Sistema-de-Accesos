import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppGeneralModule } from 'src/app/core/components/app-general/app-general.module';
import { SharedModule } from 'ngx-sigape';
import { GestionOpcionesComponent } from './modules/mantenimiento/pages/gestion-opciones/gestion-opciones.component';
import { FormSearchOpcionComponent } from './modules/mantenimiento/components/form-search-opcion/form-search-opcion.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionOpcionesComponent,
    FormSearchOpcionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppGeneralModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
