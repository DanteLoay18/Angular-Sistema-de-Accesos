import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  private readonly baseUrl: string = environment.baseUrl;;

  constructor(private http: HttpClient) { }

  getEstadoBack(): Observable<string>{

      const url  = `${ this.baseUrl }/api/auth/validarBackend`;
      return this.http.get<string>(url);



  }


}
