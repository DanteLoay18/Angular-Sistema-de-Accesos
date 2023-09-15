import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { IUsuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );
  private store = inject(Store);



  revalidarToken():Observable<IUsuario>{

    const url   = `${ this.baseUrl }/api/auth/check-token`;

    let token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      token ="";
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<IUsuario>( url, {headers} );
  }


  logout() {
    localStorage.removeItem('token');

  }


}
