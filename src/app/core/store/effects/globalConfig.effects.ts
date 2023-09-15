import { Injectable, inject } from '@angular/core';
import { GlobalConfigService } from '../../services/infraestructure/globalConfig.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as globalConfigActions from '../actions';
import { of } from 'rxjs';

@Injectable()
export class GlobalConfigEffects{
  private actions$ = inject(Actions);
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
}
