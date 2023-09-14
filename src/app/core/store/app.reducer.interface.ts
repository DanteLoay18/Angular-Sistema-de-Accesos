import { IAppTitle } from "ngx-sigape";

export interface IAppUi {
  drawerMini: boolean;
  drawerOpen: boolean;
  drawerMobileOpen: boolean;
  appTitle: IAppTitle;
  appMenu: any[];
  isMobile: boolean;
  blockUi: boolean;
  drawerAttached: boolean;
}

export interface IAppUser {
  fullName: string;
  email: string;
  lastSession: any;
  avatarText: string;
}


export interface IAppSession {
  /**
   * Indica que se está cargando la data del usuario
   */
  isLoading: boolean;
  /**
   * Indica si el usuario se encuentra logueado en el sistema
   */
  isLoggedIn: boolean;
  token: string;
  // user: IAppUser,
  /**
   * Indica a que url se debe retornar una vez logueado
   */
  loginError: boolean;
  /**
   * Indica a que la sesión se ha seteado desde el storage
   */
  fromStorage: boolean;
  /**
   * Indica a que la sesión ha expirado.
   * Normalmente cuando el servidor retorna status = 401
   */
  sessionExpired: boolean;
  user: IAppUser;
}

export interface IAppGlobalConfig {
  isLoading: boolean;
  loaded: boolean;
  error: boolean;
}
