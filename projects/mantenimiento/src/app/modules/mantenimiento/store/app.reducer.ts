import { IDataGridElement } from 'ngx-sigape';
import * as fromRoot from 'src/app/core/store/app.reducer'
import { IOpcion } from '../interfaces/opcion.interface';
import { Action, combineReducers } from '@ngrx/store';
import * as fromOpcion from './opciones/opciones.reducer'
export interface MantenimientoState {
    opcion: IDataGridElement<IOpcion>;
}

export interface State extends fromRoot.AppState {
  mantenimiento: MantenimientoState;
}

export function reducers(state: MantenimientoState | undefined, action: Action) {
  return combineReducers({
    opcion:fromOpcion.SessionReducer
  })(state, action);
}
