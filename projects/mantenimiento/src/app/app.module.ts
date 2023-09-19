import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppGeneralModule } from 'src/app/core/components/app-general/app-general.module';
import { SharedModule } from 'ngx-sigape';
import { GestionOpcionesComponent } from './modules/mantenimiento/pages/gestion-opciones/gestion-opciones.component';
import { FormSearchOpcionComponent } from './modules/mantenimiento/components/form-search-opcion/form-search-opcion.component';
import { StoreModule } from '@ngrx/store';
import * as fromMantenimiento from './modules/mantenimiento/store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { OpcionesEffects } from './modules/mantenimiento/store/opciones/opciones.effects';
import { AgregarOpcionComponent } from './modules/mantenimiento/components/agregar-opcion/agregar-opcion.component';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule} from '@angular/forms';
import { LetterOnlyDirective } from './modules/mantenimiento/directives/letter-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    GestionOpcionesComponent,
    FormSearchOpcionComponent,
    AgregarOpcionComponent,
    LetterOnlyDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppGeneralModule,
    SharedModule,
    MatSlideToggleModule,
    _MatSlideToggleRequiredValidatorModule,
    ReactiveFormsModule,
    StoreModule.forFeature({
      name:'mantenimiento',
      reducer: fromMantenimiento.reducers
    }),
    EffectsModule.forFeature([OpcionesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
