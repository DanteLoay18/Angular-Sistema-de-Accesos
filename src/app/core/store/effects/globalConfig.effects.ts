import { Injectable, inject } from '@angular/core';
import { GlobalConfigService } from '../../services/infraestructure/globalConfig.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import * as globalConfigActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GlobalConfigEffects{
  private actions$ = inject(Actions);
  private router = inject(Router)
  private globalConfigService= inject(GlobalConfigService);

  CargarEstadoGlobal$ = createEffect(()=>  this.actions$.pipe(
    ofType(globalConfigActions.globalConfig),
    exhaustMap(()=> this.globalConfigService.getEstadoBack()
                      .pipe(
                        map(() => (globalConfigActions.globalConfigSuccess())),
                        catchError(err => of(globalConfigActions.globalConfigFail(err)))
                      )
                )
    )
 )

 CargarMenu$ = createEffect(()=>  this.actions$.pipe(
  ofType(globalConfigActions.globalConfigCargarMenu),
  tap(({menu})=>{
    setTimeout(() => {
      this.router.navigate([`/${menu}`])
    }, 300);

  })),
  { dispatch: false }
)
}
