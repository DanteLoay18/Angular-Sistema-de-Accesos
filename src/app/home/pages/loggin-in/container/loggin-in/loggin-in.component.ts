import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService, SessionActions, buildUrlLogin } from '@sac/core';

@Component({
  selector: 'app-loggin-in',
  templateUrl: './loggin-in.component.html',
  styleUrls: ['./loggin-in.component.scss']
})
export class LogginInComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private router= inject(Router);
  private store= inject(Store);

  session$= this.store.select('session');

  private localstorageService= inject(LocalStorageService)
  errorMessage:string=` No ha sido posible iniciar sesión. Por favor, vuelva a intentarlo en unos minutos.<br>
    Si el problema persiste ponte en contacto con el administrador del sistema`;

  ngOnInit(): void {
    const token: string | null = this.route.snapshot.queryParamMap.get('token');

    if(token){
      this.localstorageService.set('token',token)
      this.store.dispatch(SessionActions.SessionValidateUser())
    }

  }

  handleRetryLogin = () => {
    window.location.href = buildUrlLogin();
  };

}
