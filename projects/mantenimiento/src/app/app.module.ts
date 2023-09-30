import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppGeneralModule } from 'src/app/core/components/app-general/app-general.module';
import {  SharedModule } from 'ngx-sigape';
import { GestionOpcionesComponent } from './modules/mantenimiento/pages/gestion-opciones/gestion-opciones.component';
import { FormSearchOpcionComponent } from './modules/mantenimiento/components/form-search-opcion/form-search-opcion.component';
import { StoreModule } from '@ngrx/store';
import * as fromMantenimiento from './modules/mantenimiento/store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { OpcionesEffects } from './modules/mantenimiento/store/opciones/opciones.effects';
import { AgregarOpcionComponent } from './modules/mantenimiento/components/agregar-opcion/agregar-opcion.component';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LetterOnlyDirective } from './modules/mantenimiento/directives/letter-only.directive';
import { NumberOnlyDirective } from './modules/mantenimiento/directives/number-only.directive';
import { GestionSistemasComponent } from './modules/mantenimiento/pages/gestion-sistemas/gestion-sistemas.component';
import { SistemasEffects } from './modules/mantenimiento/store/sistema/sistema.effects';
import { FormSearchSistemaComponent } from './modules/mantenimiento/components/form-search-sistema/form-search-sistema.component';
import { FormModalSistemaComponent } from './modules/mantenimiento/components/form-modal-sistema/form-modal-sistema.component';
import { GestionMenusComponent } from './modules/mantenimiento/pages/gestion-menus/gestion-menus.component';
import { FormSearchMenuComponent } from './modules/mantenimiento/components/form-search-menu/form-search-menu.component';
import { FormModalMenuComponent } from './modules/mantenimiento/components/form-modal-menu/form-modal-menu.component';
import { MenusEffects } from './modules/mantenimiento/store/menu/menu.effects';
import { SubmenusEffects } from './modules/mantenimiento/store/submenu/submenu.effects';
import { FormModalSubmenuComponent } from './modules/mantenimiento/components/form-modal-submenu/form-modal-submenu.component';
import { FormModalMenuSistemaComponent } from './modules/mantenimiento/components/form-modal-menu-sistema/form-modal-menu-sistema.component';
import { FormModalSubmenuOpcionesComponent } from './modules/mantenimiento/components/form-modal-submenu-opciones/form-modal-submenu-opciones.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionOpcionesComponent,
    FormSearchOpcionComponent,
    AgregarOpcionComponent,
    LetterOnlyDirective,
    NumberOnlyDirective,
    GestionSistemasComponent,
    FormSearchSistemaComponent,
    FormModalSistemaComponent,
    GestionMenusComponent,
    FormSearchMenuComponent,
    FormModalMenuComponent,
    FormModalSubmenuComponent,
    FormModalMenuSistemaComponent,
    FormModalSubmenuOpcionesComponent,
  ],
  imports: [
    FormsModule,
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
    EffectsModule.forFeature([OpcionesEffects, SistemasEffects, MenusEffects, SubmenusEffects])
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
