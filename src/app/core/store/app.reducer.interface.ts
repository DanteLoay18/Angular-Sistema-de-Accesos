
import { IUsuario } from "../interfaces/usuario.interface";



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
  user: IUsuario | null;
}

export interface IAppGlobalConfig {
  guidSistema: string;
  menu:string;
  isLoading: boolean;
  loaded: boolean;
  error: boolean;
}
