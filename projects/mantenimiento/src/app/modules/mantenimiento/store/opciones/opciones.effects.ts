import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as OpcionesActions from './opciones.actions'
import { OpcionService } from '../../service/opcion.service';
import { map, catchError, tap } from 'rxjs/operators';
import { AlertService } from 'ngx-sigape';




@Injectable()
export class OpcionesEffects{


  private actions$ = inject(Actions);
  private opcionService= inject(OpcionService);
  private router= inject(Router);
  private alertService= inject(AlertService);

  listarOpcion$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.CargarListadoDeOpciones),
    exhaustMap(({page, pageSize})=> this.opcionService.obtenerOpcionesPaginado(page,pageSize)
                      .pipe(
                        map((listado)=>{
                          const items= listado.items.map((listado)=>{

                            return {
                              ...listado,
                              esEmergente:listado.esEmergente ? 'SI' : 'NO',
                              tieneOpciones: listado.tieneOpciones ? 'SI' : 'NO',
                            };

                          })
                          return {
                            ...listado,
                            items
                          }
                        }),
                        map((paginacion) => (OpcionesActions.CargarListadoDeOpcionesSuccess({listado:paginacion}))),
                        catchError((error) => of(OpcionesActions.CargarListadoDeOpcionesFail({error})))
                      )
                )
    )
  )

  agregarOpcion$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.AgregarOpcion),
    exhaustMap(({nombre, icono, esEmergente, tieneOpciones})=> this.opcionService.agregarOpcion(nombre, icono, esEmergente, tieneOpciones)
                      .pipe(
                        map((opcion) => (OpcionesActions.AgregarOpcionSuccess({opcion}))),
                        catchError((error) => of(OpcionesActions.AgregarOpcionFail({error})))
                      )
                )
    )
  )

  agregarOpcionSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.AgregarOpcionSuccess),
    tap(({opcion})=>{
      this.alertService.open(`<div style="color: black;">El registro se guardo correctamente</div>`, '', { icon: "success", htmlContent: true });
      // this.dialogRef.close()
     })
   ),
   { dispatch: false }
  )

  agregarOpcionFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OpcionesActions.AgregarOpcionFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );


  setModalConsulta$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.SetModalReadOnly),
    exhaustMap(({id})=> this.opcionService.buscarOpcionPorId(id)
                      .pipe(

                        map((opcion) => (OpcionesActions.CargarDataModalSuccess({opcion})))
                      )
                )
    )
  )



}
