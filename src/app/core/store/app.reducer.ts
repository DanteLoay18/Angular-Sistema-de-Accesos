import { IAppGlobalConfig, IAppSession, IAppUi } from "./app.reducer.interface";



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

export const APP_SESSION_DEFAULT: IAppSession= {
  isLoading: false,
  isLoggedIn: false,
  user: {fullName:'', email:'', lastSession:new Date(), avatarText:''},
  token: '',
  loginError: false,
  fromStorage: false,
  sessionExpired: false,
};

export const APP_GLOBAL_CONFIG_DEFAULT: IAppGlobalConfig = {
  isLoading: false,
  loaded: false,
  error: false,
};

export class AppState {
  ui: IAppUi = APP_UI_DEFAULT;
  session: IAppSession = APP_SESSION_DEFAULT;
  globalConfig: IAppGlobalConfig = APP_GLOBAL_CONFIG_DEFAULT;
}
