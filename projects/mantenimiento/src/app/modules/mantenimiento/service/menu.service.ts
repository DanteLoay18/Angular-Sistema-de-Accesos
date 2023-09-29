import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IOpcion } from '../interfaces/opcion.interface';
import { Paginado } from '../interfaces/paginado.interface';
import { IMenu } from '../interfaces/menu.interface';




@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );



  obtenerMenusPaginado(page:number, pageSize:number, esSubmenu:boolean):Observable<Paginado<IMenu>>{

    const url   = `${ this.baseUrl }/api/menu/findAllMenus?page=${page}&pageSize=${pageSize}&esSubmenu=${esSubmenu}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<Paginado<IMenu>>( url, {headers} );
  }

  agregarMenu(nombre:string,esSubmenu:boolean, icono?:string, url?:string):Observable<IMenu>{

    const urlPeticion   = `${ this.baseUrl }/api/menu/createMenu`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.post<IMenu>( urlPeticion,{nombre, icono, url,esSubmenu}, {headers} );
  }

  buscarMenuPorId(id:string):Observable<IMenu>{

    const url   = `${ this.baseUrl }/api/menu/findMenuById/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<IMenu>( url, {headers} );
  }

  buscarMenuPaginado(nombre:string,esSubmenu:boolean, page:number, pageSize:number, icono?:string, url?:string):Observable<Paginado<IMenu>>{

    const queryParams:any = {};

    if (nombre.length>0) {
      queryParams['nombre'] = nombre;
    }

    if (icono && icono?.length>0 ) {
      queryParams['icono'] = icono;
    }

    if (url && url?.length>0) {
      queryParams['url'] = url;
    }

    const urlPeticion   = `${ this.baseUrl }/api/menu/findByBusqueda`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<Paginado<IMenu>>( urlPeticion, {headers, params:{...queryParams,esSubmenu,page, pageSize}} );


  }

  eliminarMenu(id:string){
    const url   = `${ this.baseUrl }/api/menu/deleteMenu/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.delete<IMenu>( url, {headers} );
  }

  editarMenu(id:string, nombre:string, icono?:string, url?:string, opciones?:string[], submenus?:string[] ){
    const urlPeticion   = `${ this.baseUrl }/api/menu/updateMenu/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.put<IMenu>( urlPeticion,{nombre, icono, url, opciones, submenus }, {headers} );
  }

  eliminarSistemaMenu(id:string, idSistema:string){
    const urlPeticion   = `${ this.baseUrl }/api/menu/deleteMenuSistema/${id}/${idSistema}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.delete<IMenu>( urlPeticion, {headers} );
  }

  agregarSistemaMenu(id:string, sistema:string ){
    const urlPeticion   = `${ this.baseUrl }/api/menu/updateMenu/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.put<IMenu>( urlPeticion,{sistema }, {headers} );
  }

  buscarSubmenusByMenu(id:string, page:number, pageSize:number, esSubmenu:boolean){
    const url   = `${ this.baseUrl }/api/menu/findMenuBySubmenu/${id}?page=${page}&pageSize=${pageSize}&esSubmenu=${esSubmenu}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<Paginado<IMenu>>( url, {headers} );
  }
}
