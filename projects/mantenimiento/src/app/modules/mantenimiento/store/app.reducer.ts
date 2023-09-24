
import * as fromRoot from 'src/app/core/store/app.reducer'
import { IOpcion } from '../interfaces/opcion.interface';
import { Action, combineReducers } from '@ngrx/store';
import * as fromOpcion from './opciones/opciones.reducer'
import * as fromSistema from './sistema/sistema.reducer';
import * as fromMenu from './menu/menu.reducer';
import * as fromSubmenu from './submenu/submenu.reducer'
import { IDataGridElement } from '../interfaces/dataGridElement.interface';
import { ISistema } from '../interfaces/sistema.interface';
import { IMenu } from '../interfaces/menu.interface';

export interface MantenimientoState {
    opcion: IDataGridElement<IOpcion>;
    sistema: IDataGridElement<ISistema>;
    menu: IDataGridElement<IMenu>;
    submenu:IDataGridElement<IMenu>
}

export interface State extends fromRoot.AppState {
  mantenimiento: MantenimientoState;
}

export function reducers(state: MantenimientoState | undefined, action: Action) {
  return combineReducers({
    opcion:fromOpcion.OpcionReducer,
    sistema:fromSistema.SistemaReducer,
    menu:fromMenu.MenuReducer,
    submenu:fromSubmenu.SubmenuReducer
  })(state, action);
}
