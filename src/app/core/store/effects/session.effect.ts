import { Injectable, inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of} from 'rxjs';
import {SessionActions} from '../actions';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-sigape';
import { SessionService } from '../../services';
import { SessionValidateUser, SessionValidateUserSuccess } from '../actions/session.action';

@Injectable()
export class SessionEffects{


  private actions$ = inject(Actions);
  private sessionService= inject(SessionService);
  private router= inject(Router);

  validateUsuario$ = createEffect(()=>  this.actions$.pipe(
    ofType(SessionActions.SessionValidateUser),
    exhaustMap(()=> this.sessionService.revalidarToken()
                      .pipe(
                        map(({token, ...usuario}) => (SessionActions.SessionValidateUserSuccess({usuario, token:token!}))),
                        catchError((error) => of(SessionActions.SessionValidateUserFail({error})))
                      )
                )
    )
  )

  validateUsuarioSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(SessionActions.SessionValidateUserSuccess),
    tap(({usuario})=>{
      history.replaceState(null, '', window.location.href.split('?')[0]);
        this.router.navigateByUrl('/');
     })
   ),
   { dispatch: false }
  )

  logout$ = createEffect(()=>  this.actions$.pipe(
    ofType(SessionActions.SessionLogout),
    tap(()=> {
      this.sessionService.logout();
      window.open(`http://localhost:4200/auth/login`, '_self');
    })
    ),
    { dispatch: false }
  )





}
