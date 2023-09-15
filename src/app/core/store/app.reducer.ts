import { IAppGlobalConfig, IAppSession, IAppUi } from "./app.reducer.interface";
import {ActionReducerMap} from '@ngrx/store'
import * as reducers from './reducers'
import { globalConfig } from './actions/globalConfig.action';

export const APP_UI_DEFAULT: IAppUi = {
  appTitle: {
    full: 'Sistema Administracion De Accesos',
    mini: 'SAC',
  },
  drawerMini: false,
  isMobile: false,
  drawerOpen: false,
  drawerMobileOpen: false,
  blockUi: false,
  appMenu: [],
  drawerAttached: false,
};



export interface AppState {
  // ui: IAppUi;
  session: IAppSession;
  globalConfig: IAppGlobalConfig;
}

export const appReducers: ActionReducerMap<AppState>={
  session: reducers.SessionReducer,
  globalConfig:reducers.GlobalConfigReducer
}

