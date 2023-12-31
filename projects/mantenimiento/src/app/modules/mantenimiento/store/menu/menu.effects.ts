import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as MenusActions from './menu.actions'
import { map, catchError, tap, filter } from 'rxjs/operators';
import { AlertService, ComboList } from 'ngx-sigape';
import { MenuService } from '../../service/menu.service';
import { SistemaService } from '../../service/sistema.service';


@Injectable()
export class MenusEffects{


  private actions$ = inject(Actions);
  private menuService= inject(MenuService);
  private sistemaService= inject(SistemaService);
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
                                submenus:listado.submenus?.filter(({esEliminado})=>!esEliminado).length,
                                sistema: listado.sistema ? 'SI' :'NO'
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
                        map((listado)=>{
                          const items= listado.items.map((listado)=>{
                            if(Array.isArray(listado.submenus)){
                              return {
                                ...listado,
                                submenus:listado.submenus?.filter(({esEliminado})=>!esEliminado).length,
                                sistema: listado.sistema ? 'SI' :'NO'
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
  ))

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
      map((listado)=>{
        const items= listado.items.map((listado)=>{
          if(Array.isArray(listado.submenus)){
            return {
              ...listado,
              submenus:listado.submenus?.filter(({esEliminado})=>!esEliminado).length,
              sistema: listado.sistema ? 'SI' :'NO'
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

                        map(() => (MenusActions.EditarMenuSuccess({page,pageSize}))),
                        catchError((error) => of(MenusActions.EditarMenuFail({error}))),
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
      map((listado)=>{
        const items= listado.items.map((items)=>{
          if(Array.isArray(items.submenus)){
            return {
              ...items,
              submenus:items.submenus?.filter(({esEliminado})=>!esEliminado).length,
              sistema: items.sistema ? 'SI' :'NO'
            };
          }

          return {
            ...items
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
                        map((listado)=>{
                          const items= listado.items.map((listado)=>{
                            if(Array.isArray(listado.submenus)){
                              return {
                                ...listado,
                                submenus:listado.submenus?.length,
                                sistema: listado.sistema ? 'SI' :'NO'
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
                        map((paginacion) => (MenusActions.BuscarMenuSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.BuscarMenuFail({error})))
                      )
                )
    )
  )

  setModalMenuSistema$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.setModalSistema),
    exhaustMap(({id})=> this.menuService.buscarMenuPorId(id)
                      .pipe(
                        map(({sistema})=> sistema ? {sistema, cantidad:1} : {sistema, cantidad:0}),
                        map(({sistema, cantidad}) => ( sistema!==undefined && sistema!==null  ? MenusActions.SetModalSistemaSuccess({sistema, cantidad}) :  MenusActions.SetModalSistemaVacio({cantidad}))),
                      )
                )
    )
  )

  setModalMenuSistemaSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.SetModalSistemaSuccess),
    exhaustMap(({sistema})=> this.sistemaService.obtenerSistemasPaginado(1,10)
                      .pipe(
                        map(({items})=>{return items.filter((item:any)=> item.nombre!==sistema.nombre).map((item:any)=>{

                            return {
                              label:item.nombre,
                              value:item._id
                            }
                        })}),
                        map((item)=>new ComboList(item)),
                        map((sistemasList) => (MenusActions.CargarComboBoxModalSistema({sistemasList}) )),
                      )
                )
    )
  )

  setModalMenuSistemaVacio$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.SetModalSistemaVacio),
    exhaustMap(()=> this.sistemaService.obtenerSistemasPaginado(1,10)
                      .pipe(
                        map(({items})=>{return items.map((item:any)=>{

                            return {
                              label:item.nombre,
                              value:item._id
                            }
                        })}),
                        map((item)=>new ComboList(item)),
                        map((sistemasList) => (MenusActions.CargarComboBoxModalSistema({sistemasList}) )),
                      )
                )
    )
  )


  deleteSistemaMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.deleteSistemaMenu),
    exhaustMap(({id,idSistema})=> this.menuService.eliminarSistemaMenu(id,idSistema)
                      .pipe(

                        map((sistemasList) => (MenusActions.deleteSistemaMenuSuccess() )),
                        catchError((error) => of(MenusActions.deleteSistemaMenuFail({error})))
                      )
                )
    )
  )

  deleteSistemaMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.deleteSistemaMenuSuccess),
    exhaustMap(()=> this.sistemaService.obtenerSistemasPaginado(1,10)
                      .pipe(
                        map(({items})=>{return items.map((item:any)=>{

                            return {
                              label:item.nombre,
                              value:item._id
                            }
                        })}),
                        map((item)=>new ComboList(item)),
                        map((sistemasList) => (MenusActions.CargarComboBoxModalSistema({sistemasList}) )),
                      )
                )
    )
  )


  agregarSistemaMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.agregarSistemaMenu),
    exhaustMap(({id,idSistema})=> this.menuService.agregarSistemaMenu(id,idSistema)
                      .pipe(
                        map(() => (MenusActions.agregarSistemaMenuSuccess({id}) )),
                        catchError((error) => of(MenusActions.agregarSistemaMenuFail({error})))
                      )
                )
    )
  )

  agregarSistemaMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.agregarSistemaMenuSuccess),
     exhaustMap(({id})=> this.menuService.buscarMenuPorId(id)
                            .pipe(
                              map(({sistema})=> sistema ? {sistema, cantidad:1} : {sistema, cantidad:0}),
                              map(({sistema, cantidad}) => ( sistema!==undefined && sistema!==null  ? MenusActions.SetModalSistemaSuccess({sistema, cantidad}) :  MenusActions.SetModalSistemaVacio({cantidad}))),
                            )),

    )
  )

  regresarAMenu$=createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.RegresarAMenus),
    exhaustMap(({page, pageSize})=> this.menuService.obtenerMenusPaginado(page,pageSize,false)
                      .pipe(
                        map((listado)=>{
                          const items= listado.items.map((listado)=>{
                            if(Array.isArray(listado.submenus)){
                              return {
                                ...listado,
                                submenus:listado.submenus?.filter(({esEliminado})=>!esEliminado).length,
                                sistema: listado.sistema ? 'SI' :'NO'
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
}
