import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOpcion } from '../interfaces/opcion.interface';
import { Paginado } from '../interfaces/paginado.interface';
import { ISistema } from '@sac/core';




@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );



  obtenerSistemasPaginado(page:number, pageSize:number):Observable<Paginado<ISistema>>{

    const url   = `${ this.baseUrl }/api/sistema/findAllSistemas?page=${page}&pageSize=${pageSize}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<Paginado<ISistema>>( url, {headers} );
  }

  agregarSistema(nombre:string, icono:string, puerto:string, url:string, imagen:string ):Observable<ISistema>{

    const urlPeticion   = `${ this.baseUrl }/api/sistema/createSistema`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.post<ISistema>( urlPeticion,{nombre, icono, puerto,imagen, url}, {headers} );
  }

  buscarSistemaPorId(id:string):Observable<ISistema>{

    const url   = `${ this.baseUrl }/api/sistema/findSistemaById/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<ISistema>( url, {headers} );
  }

  buscarSistemaPaginado(nombre:string, icono:string, url:string, puerto:string, page:number, pageSize:number):Observable<Paginado<ISistema>>{

    const queryParams:any = {};

    if (nombre.length>0) {
      queryParams['nombre'] = nombre;
    }

    if (icono.length>0) {
      queryParams['icono'] = icono;
    }

    if (url.length>0) {
      queryParams['url'] = url;
    }

    if (puerto.length>0) {
      queryParams['puerto'] = puerto;
    }
    const urlPeticion   = `${ this.baseUrl }/api/sistema/findByBusqueda`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<Paginado<ISistema>>( urlPeticion, {headers, params:{...queryParams,page, pageSize}} );


  }

  eliminarSistema(id:string){
    const url   = `${ this.baseUrl }/api/sistema/deleteSistema/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.delete<ISistema>( url, {headers} );
  }

  editarSistema(id:string, nombre:string, icono:string, url:string, puerto:string, imagen:string){
    const urlPeticion   = `${ this.baseUrl }/api/sistema/updateSistema/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

url
    return this.http.put<IOpcion>( urlPeticion,{nombre, icono, url, puerto,imagen}, {headers} );
  }
}
