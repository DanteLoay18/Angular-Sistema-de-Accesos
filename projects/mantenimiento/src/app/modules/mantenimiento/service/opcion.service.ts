import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOpcion } from '../interfaces/opcion.interface';
import { Paginado } from '../interfaces/paginado.interface';




@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );
  private store = inject(Store);



  obtenerOpcionesPaginado(page:number, pageSize:number):Observable<Paginado<IOpcion>>{

    const url   = `${ this.baseUrl }/api/opcion/findAllOpciones?page=${page}&pageSize=${pageSize}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<Paginado<IOpcion>>( url, {headers} );
  }

  agregarOpcion(nombre:string, icono:string, esEmergente:boolean, tieneOpciones:boolean):Observable<IOpcion>{

    const url   = `${ this.baseUrl }/api/opcion/createOpcion`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.post<IOpcion>( url,{nombre, icono, esEmergente, tieneOpciones}, {headers} );
  }

  buscarOpcionPorId(id:string):Observable<IOpcion>{

    const url   = `${ this.baseUrl }/api/opcion/findOpcionById/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<IOpcion>( url, {headers} );
  }

  buscarOpcionPaginado(nombre:string, icono:string, esEmergente:boolean |string | null, pageSize:number):Observable<Paginado<IOpcion>>{

    const queryParams:any = {};

    if (nombre.length>0) {
      queryParams['nombre'] = nombre;
    }

    if (icono.length>0) {
      queryParams['icono'] = icono;
    }

    if (esEmergente !== null) {
      queryParams['esEmergente'] = esEmergente;
    }
    const url   = `${ this.baseUrl }/api/opcion/findByBusqueda`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    if(Object.keys(queryParams).length === 0){
      return this.obtenerOpcionesPaginado(1,pageSize)
    }else{
      return this.http.get<Paginado<IOpcion>>( url, {headers, params:{...queryParams, pageSize:pageSize}} );
    }

  }

  eliminarOpcion(id:string){
    const url   = `${ this.baseUrl }/api/opcion/deleteopcion/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.delete<IOpcion>( url, {headers} );
  }

  editarOpcion(id:string, nombre:string, icono:string, esEmergente:boolean, tieneOpciones:boolean){
    const url   = `${ this.baseUrl }/api/opcion/updateOpcion/${id}`;

    let token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.put<IOpcion>( url,{nombre, icono, esEmergente, tieneOpciones}, {headers} );
  }
}
