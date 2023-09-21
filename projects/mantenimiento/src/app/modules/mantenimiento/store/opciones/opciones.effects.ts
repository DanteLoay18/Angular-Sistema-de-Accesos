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
    exhaustMap(({nombre, icono, esEmergente, tieneOpciones,page,pageSize})=> this.opcionService.agregarOpcion(nombre, icono, esEmergente, tieneOpciones)
                      .pipe(
                        map((opcion) => (OpcionesActions.AgregarOpcionSuccess({opcion,page,pageSize}))),
                        catchError((error) => of(OpcionesActions.AgregarOpcionFail({error})))
                      )
                )
    )
  )

  agregarOpcionSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.AgregarOpcionSuccess),
    tap(({opcion})=>{
      this.alertService.open(`<div style="color: black;">El registro se guardo correctamente</div>`, '', { icon: "success", htmlContent: true });

     }),
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

  eliminarOpcion$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.EliminarOpcion),
    exhaustMap(({id, page,pageSize})=> this.opcionService.eliminarOpcion(id)
                      .pipe(
                        map((opcion) => (OpcionesActions.EliminarOpcionSuccess({opcion,page,pageSize}))),
                        catchError((error) => of(OpcionesActions.EliminarOpcionFail({error})))
                      )
                )
    )
  )

  eliminarOpcionSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.EliminarOpcionSuccess),
    tap(()=>{
      this.alertService.open('Registro eliminado', undefined, { icon: 'success' });

     }),
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
   ),
  )

  eliminarOpcionFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OpcionesActions.EliminarOpcionFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  editarOpcion$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.EditarOpcion),
    exhaustMap(({id,nombre, icono, esEmergente, tieneOpciones, page,pageSize})=> this.opcionService.editarOpcion(id,nombre, icono, esEmergente, tieneOpciones)
                      .pipe(
                        map((opcion) => (OpcionesActions.EditarOpcionSuccess({opcion,page,pageSize}))),
                        catchError((error) => of(OpcionesActions.EditarOpcionFail({error})))
                      )
                )
    )
  )

  editarOpcionSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.EditarOpcionSuccess),
    tap(()=>{
      this.alertService.open('El Registro se actualizo correctamente', undefined, { icon: 'success' });

     }),
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
   ),
  )

  editarOpcionFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OpcionesActions.EditarOpcionFail),
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

  setModalEditar$ = createEffect(()=>  this.actions$.pipe(
    ofType(OpcionesActions.SetModalEditar),
    exhaustMap(({id})=> this.opcionService.buscarOpcionPorId(id)
                      .pipe(

                        map((opcion) => (OpcionesActions.CargarDataModalSuccess({opcion})))
                      )
                )
    )
  )


}
