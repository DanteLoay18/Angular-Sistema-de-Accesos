export class Sistema{
  nombre:string='';
  icono:string='';
  url:string ='';
  puerto:string='';
  imagen:string='';

  static createSistema(nombre: string, icono:string, url:string, puerto:string, imagen:string){
    const sistema = new Sistema();

    sistema.nombre=nombre;
    sistema.icono=icono;
    sistema.url=url;
    sistema.puerto=puerto;
    sistema.imagen=imagen;
    return sistema;
 }
}
