import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as SistemaActions from './sistema.action'
import { map, catchError, tap } from 'rxjs/operators';
import { AlertService } from 'ngx-sigape';
import { SistemaService } from '../../service/sistema.service';


@Injectable()
export class SistemasEffects{


  private actions$ = inject(Actions);
  private sistemaService= inject(SistemaService);
  private alertService= inject(AlertService);

  listarSistema$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.CargarListadoDeSistemas),
    exhaustMap(({page, pageSize})=> this.sistemaService.obtenerSistemasPaginado(page,pageSize)
                      .pipe(
                        map((paginacion) => (SistemaActions.CargarListadoDeSistemasSuccess({listado:paginacion}))),
                        catchError((error) => of(SistemaActions.CargarListadoDeSistemasFail({error})))
                      )
                )
    )
  )

  agregarSistema$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.AgregarSistema),
    exhaustMap(({nombre, icono, url ,puerto, imagen,page,pageSize})=> this.sistemaService.agregarSistema(nombre, icono, puerto, url, imagen)
                      .pipe(
                        map(() => (SistemaActions.AgregarSistemaSuccess({page,pageSize}))),
                        catchError((error) => of(SistemaActions.AgregarSistemaFail({error})))
                      )
                )
    )
  )

  agregarSistemaSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.AgregarSistemaSuccess),
    tap(()=>{
      this.alertService.open(`<div style="color: black;">El registro se guardo correctamente</div>`, '', { icon: "success", htmlContent: true });

     }),
     exhaustMap(({page, pageSize})=> this.sistemaService.obtenerSistemasPaginado(page,pageSize)
     .pipe(

       map((paginacion) => (SistemaActions.CargarListadoDeSistemasSuccess({listado:paginacion}))),
       catchError((error) => of(SistemaActions.CargarListadoDeSistemasFail({error})))
     )
)
   )
  )

  agregarSistemaFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SistemaActions.AgregarSistemaFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  eliminarSistema$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.EliminarSistema),
    exhaustMap(({id, page,pageSize})=> this.sistemaService.eliminarSistema(id)
                      .pipe(
                        map(() => (SistemaActions.EliminarSistemaSuccess({page,pageSize}))),
                        catchError((error) => of(SistemaActions.EliminarSistemaFail({error})))
                      )
                )
    )
  )

  eliminarSistemaSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.EliminarSistemaSuccess),
    tap(()=>{
      this.alertService.open('Registro eliminado', undefined, { icon: 'success' });

     }),
     exhaustMap(({page, pageSize})=> this.sistemaService.obtenerSistemasPaginado(page,pageSize)
     .pipe(

       map((paginacion) => (SistemaActions.CargarListadoDeSistemasSuccess({listado:paginacion}))),
       catchError((error) => of(SistemaActions.CargarListadoDeSistemasFail({error})))
     )
)
   ),
  )

  eliminarSistemaFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SistemaActions.EliminarSistemaFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  editarSistema$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.EditarSistema),
    exhaustMap(({id,nombre, icono, url, puerto, imagen, page,pageSize})=> this.sistemaService.editarSistema(id,nombre, icono, url, puerto, imagen)
                      .pipe(
                        map((opcion) => (SistemaActions.EditarSistemaSuccess({page,pageSize}))),
                        catchError((error) => of(SistemaActions.EditarSistemaFail({error})))
                      )
                )
    )
  )

  editarOpcionSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.EditarSistemaSuccess),
    tap(()=>{
      this.alertService.open('El Registro se actualizo correctamente', undefined, { icon: 'success' });

     }),
     exhaustMap(({page, pageSize})=> this.sistemaService.obtenerSistemasPaginado(page,pageSize)
     .pipe(

       map((paginacion) => (SistemaActions.CargarListadoDeSistemasSuccess({listado:paginacion}))),
       catchError((error) => of(SistemaActions.CargarListadoDeSistemasFail({error})))
     )
)
   ),
  )

  editarOpcionFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SistemaActions.EditarSistemaFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  setModalConsulta$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.SetModalReadOnly),
    exhaustMap(({id})=> this.sistemaService.buscarSistemaPorId(id)
                      .pipe(

                        map((sistema) => (SistemaActions.CargarDataModalSuccess({sistema})))
                      )
                )
    )
  )

  setModalEditar$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.SetModalEditar),
    exhaustMap(({id})=> this.sistemaService.buscarSistemaPorId(id)
                      .pipe(

                        map((sistema) => (SistemaActions.CargarDataModalSuccess({sistema})))
                      )
                )
    )
  )

  buscarSistema$ = createEffect(()=>  this.actions$.pipe(
    ofType(SistemaActions.BuscarSistema),
    exhaustMap(({nombre, icono, url,puerto,page, pageSize})=> this.sistemaService.buscarSistemaPaginado(nombre, icono, url ,puerto,page,pageSize)
                      .pipe(
                        map((paginacion) => (SistemaActions.BuscarSistemaSuccess({listado:paginacion}))),
                        catchError((error) => of(SistemaActions.BuscarSistemaFail({error})))
                      )
                )
    )
  )



}
