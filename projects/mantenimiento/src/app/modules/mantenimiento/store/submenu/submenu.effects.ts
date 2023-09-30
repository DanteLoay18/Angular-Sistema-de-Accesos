import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import * as MenusActions from './submenu.actions'
import { map, catchError, tap, filter } from 'rxjs/operators';
import { AlertService, ComboList } from 'ngx-sigape';
import { MenuService } from '../../service/menu.service';
import { OpcionService } from '../../service/opcion.service';


@Injectable()
export class SubmenusEffects{


  private actions$ = inject(Actions);
  private menuService= inject(MenuService);
  private opcionesService= inject(OpcionService);
  private alertService= inject(AlertService);

  listarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.CargarListadoDeSubmenus),
    exhaustMap(({id,page, pageSize})=> this.menuService.buscarSubmenusByMenu(id,page,pageSize,false)
                      .pipe(
                        map((listado)=>{
                          const items= listado.items.map((listado)=>{
                            if(Array.isArray(listado.opciones)){
                              return {
                                ...listado,
                                opciones:listado.opciones?.length
                              };
                            }

                            return {
                              ...listado,
                              esEliminado:false
                            }

                          })
                          return {
                            ...listado,
                            items
                          }
                        }),
                        map((paginacion) => (MenusActions.CargarListadoDeSubmenusSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.CargarListadoDeSubmenusFail({error})))
                      )
                )
    )
  )

  agregarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.AgregarSubmenu),
    exhaustMap(({idMenu,nombre,page,pageSize})=> this.menuService.agregarSubmenu(idMenu,nombre )
                      .pipe(
                        map(() => (MenusActions.AgregarSubmenuSuccess({idMenu,page,pageSize}))),
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
     exhaustMap(({idMenu,page, pageSize})=> this.menuService.buscarSubmenusByMenu(idMenu,page,pageSize,false)
     .pipe(
      map((listado)=>{
        const items= listado.items.map((listado)=>{
          if(Array.isArray(listado.opciones)){
            return {
              ...listado,
              opciones:listado.opciones?.length
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
    { dispatch: false }
  );

  eliminarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EliminarSubmenu),
    exhaustMap(({id,idMenu, page,pageSize})=> this.menuService.eliminarMenu(id)
                      .pipe(
                        map(() => (MenusActions.EliminarSubmenuSuccess({idMenu,page,pageSize}))),
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
     exhaustMap(({idMenu,page, pageSize})=> this.menuService.buscarSubmenusByMenu(idMenu,page,pageSize,false)
     .pipe(
      map((listado)=>{
        const items= listado.items.map((listado)=>{
          if(Array.isArray(listado.opciones)){
            return {
              ...listado,
              opciones:listado.opciones?.length
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
    { dispatch: false }
  );

  editarMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EditarSubmenu),
    exhaustMap(({id,idMenu,nombre, page,pageSize})=> this.menuService.editarSubmenu(id,nombre,idMenu)
                      .pipe(
                        map(() => (MenusActions.EditarSubmenuSuccess({idMenu,page,pageSize}))),
                        catchError((error) => of(MenusActions.EditarSubmenuFail({error})))
                      )
                )
    ),
  )

  editarMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.EditarSubmenuSuccess),
    tap(()=>{
      this.alertService.open('El Registro se actualizo correctamente', undefined, { icon: 'success' });

     }),
     exhaustMap(({idMenu,page, pageSize})=> this.menuService.buscarSubmenusByMenu(idMenu,page,pageSize,false)
     .pipe(
      map((listado)=>{
        const items= listado.items.map((listado)=>{
          if(Array.isArray(listado.opciones)){
            return {
              ...listado,
              opciones:listado.opciones?.length
            };
          }

          return {
            ...listado,
            esEliminado:false
          }

        })
        return {
          ...listado,
          items
        }
      }),
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
    ofType(MenusActions.BuscarSubmenu),
    exhaustMap(({nombre,page, pageSize})=> this.menuService.buscarMenuPaginado(nombre,true,page,pageSize)
                      .pipe(
                        map((paginacion) => (MenusActions.BuscarSubmenuSuccess({listado:paginacion}))),
                        catchError((error) => of(MenusActions.BuscarSubmenuFail({error})))
                      )
                )
    )
  )

  setModalMenuOpciones$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.setModalOpciones),
    exhaustMap(({id})=> this.menuService.buscarMenuPorId(id)
                      .pipe(
                        map(({opciones})=> {
                          if(Array.isArray(opciones)){
                            return opciones.length>0 ? {opciones, cantidad:1} : {opciones, cantidad:0};
                          }
                          return {opciones ,cantidad:0};
                        }),
                        map(({opciones, cantidad}) => ( MenusActions.SetModalOpcionesSuccess({opciones, cantidad}))),
                      )
                )
    )
  )

  setModalMenuOpcionesSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.SetModalOpcionesSuccess),
    exhaustMap(({opciones})=> this.opcionesService.obtenerOpcionesPaginado(1,10)
                      .pipe(
                        map(({items})=>{
                          const opcionList= opciones.map((opcion:any)=>opcion.nombre)

                          return items.filter((item:any)=> !opcionList.includes(item.nombre)).map((item:any)=>{

                            return {
                              label:item.nombre,
                              value:item._id
                            }
                        })}),
                        map((item)=>new ComboList(item)),
                        map((opcionesList) => (MenusActions.CargarComboBoxModalOpciones({opcionesList}) )),
                      )
                )
    )
  )




  deleteOpcionesMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.deleteOpcionesSubmenu),
    exhaustMap(({id,idOpcion, submenuNombre})=> this.menuService.eliminarOpcionSubmenu(id,idOpcion)
                      .pipe(

                        map((sistemasList) => (MenusActions.deleteOpcionesSubmenuSuccess({id,submenuNombre}) )),
                        catchError((error) => of(MenusActions.deleteOpcionesSubmenuFail({error})))
                      )
                )
    )
  )

  deleteOpcionesMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.deleteOpcionesSubmenuSuccess),
    exhaustMap(({id,submenuNombre})=> this.opcionesService.obtenerOpcionesPaginado(1,10)
                      .pipe(
                        map(({items})=>{return items.map((item:any)=>{

                            return {
                              label:item.nombre,
                              value:item._id
                            }
                        })}),
                        map((item)=>new ComboList(item)),
                        map((opcionesList) => (MenusActions.CargarComboBoxModalOpciones({opcionesList}) )),
                        map(()=>(MenusActions.setModalOpciones({id, submenuNombre})))
                      )
                )
    )
  )


  agregarOpcionesMenu$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.agregarOpcionesSubmenu),
    exhaustMap(({id,idOpcion, items})=> this.menuService.agregarOpcionSubmenu(id,idOpcion,items)
                      .pipe(
                        map(() => (MenusActions.agregarOpcionesSubmenuSuccess({id}) )),
                        catchError((error) => of(MenusActions.agregarOpcionesSubmenuFail({error})))
                      )
                )
    )
  )

  agregarOpcionesMenuSuccess$ = createEffect(()=>  this.actions$.pipe(
    ofType(MenusActions.agregarOpcionesSubmenuSuccess),
     exhaustMap(({id})=> this.menuService.buscarMenuPorId(id)
                            .pipe(
                              map(({opciones})=> {
                                if(Array.isArray(opciones)){
                                  return opciones.length>0 ? {opciones, cantidad:1} : {opciones, cantidad:0};
                                }
                                return {opciones ,cantidad:0};
                              }),
                              map(({opciones, cantidad}) => ( MenusActions.SetModalOpcionesSuccess({opciones, cantidad}))),
                            )),

    )
  )


}
