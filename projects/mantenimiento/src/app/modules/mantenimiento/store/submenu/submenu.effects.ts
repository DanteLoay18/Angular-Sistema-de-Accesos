import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as MenusActions from './submenu.actions'
import { map, catchError, tap } from 'rxjs/operators';
import { AlertService } from 'ngx-sigape';
import { MenuService } from '../../service/menu.service';


@Injectable()
export class SubmenusEffects{


  private actions$ = inject(Actions);
  private menuService= inject(MenuService);
  private alertService= inject(AlertService);

  listarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.CargarListadoDeSubmenus),
    exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,true)
                      .pipe(
                        map((paginacion) => (MenusActions.CargarListadoDeSubmenusSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.CargarListadoDeSubmenusFail({error})))
                      )
                )
    )
  )

  agregarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.AgregarSubmenu),
    exhaustMap(({nombre,esSubmenu,page,pageSize})=> this.menuService.agregarMenu(nombre,esSubmenu )
                      .pipe(
                        map(() => (MenusActions.AgregarSubmenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.AgregarSubmenuFail({error})))
                      )
                )
    )
  )

  agregarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.AgregarSubmenuSuccess),
    tap(()=>{
      this.alertService.open(`<div style="color: black;">El registro se guardo correctamente</div>`, '', { icon: "success", htmlContent: true });

     }),
     exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,true)
     .pipe(

       map((paginacion) => (MenusActions.CargarListadoDeSubmenusSuccess({listado:paginacion}))),
       catchError((error) => of(MenusActions.CargarListadoDeSubmenusFail({error})))
     )
)
   )
  )

  agregarMenuFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MenusActions.AgregarSubmenuFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: true }
  );

  eliminarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EliminarSubmenu),
    exhaustMap(({id, page,pageSize})=> this.menuService.eliminarMenu(id)
                      .pipe(
                        map(() => (MenusActions.EliminarSubmenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.EliminarSubmenuFail({error})))
                      )
                )
    )
  )

  eliminarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EliminarSubmenuSuccess),
    tap(()=>{
      this.alertService.open('Registro eliminado', undefined, { icon: 'success' });

     }),
     exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,true)
     .pipe(

       map((paginacion) => (MenusActions.CargarListadoDeSubmenusSuccess({listado:paginacion}))),
       catchError((error) => of(MenusActions.CargarListadoDeSubmenusFail({error})))
     )
)
   ),
  )

  eliminarMenuFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MenusActions.EliminarSubmenuFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: true }
  );

  editarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EditarSubmenu),
    exhaustMap(({id,nombre, page,pageSize})=> this.menuService.editarMenu(id,nombre)
                      .pipe(
                        map((opcion) => (MenusActions.EditarSubmenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.EditarSubmenuFail({error})))
                      )
                )
    )
  )

  editarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EditarSubmenuSuccess),
    tap(()=>{
      this.alertService.open('El Registro se actualizo correctamente', undefined, { icon: 'success' });

     }),
     exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,true)
     .pipe(

       map((paginacion) => (MenusActions.CargarListadoDeSubmenusSuccess({listado:paginacion}))),
       catchError((error) => of(MenusActions.CargarListadoDeSubmenusFail({error})))
     )
)
   ),
  )

  editarMenuFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MenusActions.EditarSubmenuFail),
        tap(({error}) => {
           this.alertService.open(`<div style="color: black;">${error.error.message}</div>`, '<div style="color: red;">Error</div>', { icon: "error", htmlContent: true });

        })
      ),
    { dispatch: true }
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
    ofType(MenusActions.BuscarSubmenu),
    exhaustMap(({nombre,page, pageSize})=> this.menuService.buscarMenuPaginado(nombre,true,page,pageSize)
                      .pipe(
                        map((paginacion) => (MenusActions.BuscarSubmenuSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.BuscarSubmenuFail({error})))
                      )
                )
    )
  )



}
