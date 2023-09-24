import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as MenusActions from './menu.actions'
import { map, catchError, tap } from 'rxjs/operators';
import { AlertService } from 'ngx-sigape';
import { MenuService } from '../../service/menu.service';


@Injectable()
export class MenusEffects{


  private actions$ = inject(Actions);
  private menuService= inject(MenuService);
  private alertService= inject(AlertService);

  listarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.CargarListadoDeMenus),
    exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,false)
                      .pipe(
                        map((listado)=>{
                          const items= listado.items.map((listado)=>{
                            if(Array.isArray(listado.submenus)){
                              return {
                                ...listado,
                                submenus:listado.submenus?.length
                              };
                            }

                            return {
                              ...listado
                            }

                          })
                          return {
                            ...listado,
                            items
                          }
                        }),
                        map((paginacion) => (MenusActions.CargarListadoDeMenusSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.CargarListadoDeMenusFail({error})))
                      )
                )
    )
  )

  agregarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.AgregarMenu),
    exhaustMap(({nombre, icono, url ,esSubmenu,page,pageSize})=> this.menuService.agregarMenu(nombre,esSubmenu, icono, url, )
                      .pipe(
                        map(() => (MenusActions.AgregarMenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.AgregarMenuFail({error})))
                      )
                )
    )
  )

  agregarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.AgregarMenuSuccess),
    tap(()=>{
      this.alertService.open(`<div style="color: black;">El registro se guardo correctamente</div>`, '', { icon: "success", htmlContent: true });

     }),
     exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,false)
     .pipe(

       map((paginacion) => (MenusActions.CargarListadoDeMenusSuccess({listado:paginacion}))),
       catchError((error) => of(MenusActions.CargarListadoDeMenusFail({error})))
     )
)
   )
  )

  agregarMenuFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MenusActions.AgregarMenuFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  eliminarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EliminarMenu),
    exhaustMap(({id, page,pageSize})=> this.menuService.eliminarMenu(id)
                      .pipe(
                        map(() => (MenusActions.EliminarMenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.EliminarMenuFail({error})))
                      )
                )
    )
  )

  eliminarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EliminarMenuSuccess),
    tap(()=>{
      this.alertService.open('Registro eliminado', undefined, { icon: 'success' });

     }),
     exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,false)
     .pipe(

       map((paginacion) => (MenusActions.CargarListadoDeMenusSuccess({listado:paginacion}))),
       catchError((error) => of(MenusActions.CargarListadoDeMenusFail({error})))
     )
)
   ),
  )

  eliminarMenuFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MenusActions.EliminarMenuFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  editarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EditarMenu),
    exhaustMap(({id,nombre, icono, url, page,pageSize})=> this.menuService.editarMenu(id,nombre, icono, url)
                      .pipe(
                        map((opcion) => (MenusActions.EditarMenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.EditarMenuFail({error})))
                      )
                )
    )
  )

  editarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EditarMenuSuccess),
    tap(()=>{
      this.alertService.open('El Registro se actualizo correctamente', undefined, { icon: 'success' });

     }),
     exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,false)
     .pipe(

       map((paginacion) => (MenusActions.CargarListadoDeMenusSuccess({listado:paginacion}))),
       catchError((error) => of(MenusActions.CargarListadoDeMenusFail({error})))
     )
)
   ),
  )

  editarMenuFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MenusActions.EditarMenuFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: false }
  );

  setModalConsulta$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.SetModalReadOnly),
    exhaustMap(({id})=> this.menuService.buscarMenuPorId(id)
                      .pipe(

                        map((menu) => (MenusActions.CargarDataModalSuccess({menu})))
                      )
                )
    )
  )

  setModalEditar$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.SetModalEditar),
    exhaustMap(({id})=> this.menuService.buscarMenuPorId(id)
                      .pipe(

                        map((menu) => (MenusActions.CargarDataModalSuccess({menu})))
                      )
                )
    )
  )

  buscarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.BuscarMenu),
    exhaustMap(({nombre, icono, url,page, pageSize})=> this.menuService.buscarMenuPaginado(nombre, false,page,pageSize,icono, url ,)
                      .pipe(
                        map((paginacion) => (MenusActions.BuscarMenuSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.BuscarMenuFail({error})))
                      )
                )
    )
  )



}
