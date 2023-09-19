import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as OpcionesActions from './opciones.actions'
import { OpcionService } from '../../service/opcion.service';
import { map, catchError, tap } from 'rxjs/operators';





@Injectable()
export class OpcionesEffects{


  private actions$ = inject(Actions);
  private opcionService= inject(OpcionService);
  private router= inject(Router);

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
    tap(console.log),
    exhaustMap(({nombre, icono, esEmergente, tieneOpciones})=> this.opcionService.agregarOpcion(nombre, icono, esEmergente, tieneOpciones)
                      .pipe(
                        tap(console.log),
                        map((opcion) => (OpcionesActions.AgregarOpcionSuccess({opcion}))),
                        catchError((error) => of(OpcionesActions.CargarListadoDeOpcionesFail({error})))
                      )
                )
    )
  )




}
