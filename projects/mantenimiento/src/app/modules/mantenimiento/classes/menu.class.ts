export class Menu{
  nombre:string='';
  icono:string='';
  url:string ='';
  esSubmenu:boolean=false;

  static createMenu(nombre: string, icono:string, url:string){
    const menu = new Menu();

    menu.nombre=nombre;
    menu.icono=icono;
    menu.url=url;
    menu.esSubmenu=false;
    return menu;
 }


 static createSubmenu(nombre: string){
  const menu = new Menu();
  menu.nombre=nombre;
  menu.esSubmenu=true;
  return menu;
}
}
