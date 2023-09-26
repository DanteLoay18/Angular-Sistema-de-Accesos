

export interface IMenu{
  nombre:string;
  icono?:string;
  url?:string;
  sistema?: string | IFormMenuSistema;
  opciones?:string[] | number;
  submenus?:string[] | number;
}

export interface IFormMenuSistema{
  nombre:string;
  icono:string;
  url:string  ;
  imagen?:string;
  puerto:string ;
}
