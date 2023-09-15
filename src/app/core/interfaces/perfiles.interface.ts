
export interface IPerfiles{
  activo:boolean,
  perfil:IPerfil;
}

export interface IPerfil{
  _id?:      string;
  tipo:     string;
  sistemas: ISistema[];
}

export interface ISistema {
  id:          string;
  nombre:      string;
  imagen:      string;
  puerto:      string;
  icono:       string;
  url:         string;
  esEliminado: boolean;
  menus:       IMenu[];
}

export interface IMenu {
  id:          string;
  nombre:      string;
  esSubmenu:   boolean;
  esEliminado: boolean;
  submenus?:   IMenu[];
  opciones?:   IOpciones[];
}

export interface IOpciones {
  id:            string;
  nombre:        string;
  icono:         string;
  tieneOpciones: boolean;
  esEmergente:   boolean;
  esEliminado:   boolean;
}
