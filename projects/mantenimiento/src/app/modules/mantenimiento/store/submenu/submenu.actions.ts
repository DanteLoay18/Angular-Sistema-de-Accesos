import { createAction, props } from "@ngrx/store";
import { IComboList, IDataGridColumnDefinition, IDataGridSource } from "ngx-sigape";
import { IMenu,IMenuResponse } from "../../interfaces/menu.interface";




export const CargarListadoDeSubmenus= createAction(
  '[Submenu] Cargar Listado',
  props<{ id:string, titulo:string, page:number, pageSize:number }>()
);

export const CargarListadoDeSubmenusSuccess= createAction(
  '[Submenu] Cargar Listado Success',
  props<{ listado:IDataGridSource<IMenuResponse>}>()
);

export const CargarListadoDeSubmenusFail= createAction(
  '[Submenu] Cargar Listado Fail',
  props<{ error : any}>()
);

export const AgregarSubmenu= createAction(
  '[Submenu] Agregar Submenu',
  props<{ idMenu:string, nombre:string,page:number, pageSize:number}>()
);

export const AgregarSubmenuSuccess= createAction(
  '[Submenu] Agregar Submenu Success',
  props<{ idMenu:string,page:number, pageSize:number}>()
);

export const AgregarSubmenuFail= createAction(
  '[Submenu] Agregar Submenu Fail',
  props<{ error : any}>()
);

export const SetModalReadOnly= createAction(
  '[Submenu] Set Modal Read Only',
  props<{ id : string}>()
);

export const SetModalEditar= createAction(
  '[Submenu] Set Modal Editar',
  props<{ id : string}>()
);

export const SetModalNuevo= createAction(
  '[Submenu] Set Modal Nuevo'
);

export const CargarDataModalSuccess= createAction(
  '[Submenu] Cargar Data Modal Success',
  props<{ menu : IMenuResponse}>()
);

export const EstadoInicialModal= createAction(
  '[Submenu] Estado Inicial Modal'
);

export const EliminarSubmenu= createAction(
  '[Submenu] Eliminar Submenu ',
  props<{ id: string, idMenu:string, page:number, pageSize:number}>()
);

export const EliminarSubmenuSuccess= createAction(
  '[Submenu] Eliminar Submenu Success',
  props<{idMenu:string,page:number, pageSize:number}>()
);

export const EliminarSubmenuFail= createAction(
  '[Submenu] Eliminar Submenu Fail',
  props<{ error: any}>()
);

export const EditarSubmenu= createAction(
  '[Submenu] Editar Submenu ',
  props<{ id: string,idMenu:string, nombre:string, page:number, pageSize:number}>()
);

export const EditarSubmenuSuccess= createAction(
  '[Submenu] Editar Submenu Success',
  props<{ idMenu:string, page:number, pageSize:number}>()
);

export const EditarSubmenuFail= createAction(
  '[Submenu] Editar Submenu Fail',
  props<{ error: any}>()
);

export const BuscarSubmenu= createAction(
  '[Submenu] Buscar Submenu ',
  props<{nombre:string, page:number,pageSize:number}>()
);

export const BuscarSubmenuSuccess= createAction(
  '[Submenu] Buscar Submenu Success',
  props<{ listado:IDataGridSource<IMenuResponse>}>()
);

export const BuscarSubmenuFail= createAction(
  '[Submenu] Buscar Submenu Fail',
  props<{ error:any}>()
);

export const CargarForm = createAction(
  '[Submenu] Cargar Form',
  props<{ currentForm: string}>()
)

export const CargarFormSubmenus = createAction(
  '[Submenu] Cargar Form Submenus',
  props<{ opciones: any[]}>()
)

export const CargarDataGridSubmenus = createAction(
  '[Submenu] Cargar Data Grid Column de Submenus',
  props<{ columna: IDataGridColumnDefinition}>()
)

export const listadoDeSubmenusPorMenu = createAction(
  '[Submenu] Cargar Listado de Submenus por Menu',
  props<{ id:string}>()
)

export const listadoDeSubmenusPorMenuSuccess = createAction(
  '[Submenu] Cargar Listado de Submenus por Menu',
  props<{ id:string}>()
)

export const limpiarItemsTabla = createAction(
  '[Submenu] Limpiar items tabla'
)

//ACCIONES DE OPCIONES

export const setModalOpciones= createAction(
  '[Submenu] Set Modal SubmenuOpciones',
  props<{ id:string, submenuNombre:string}>()
)

export const SetModalOpcionesSuccess= createAction(
  '[Submenu] Set Modal Opciones Success',
  props<{ opciones: any, cantidad:number }>()
);

export const SetModalOpcionesFail= createAction(
  '[Submenu] Set Modal Opciones Success',
  props<{ error: any }>()
);


export const SetModalOpcionesVacio= createAction(
  '[Submenu] Set Modal Opciones Vacio',
  props<{ cantidad:number}>()
);

export const CargarComboBoxModalOpciones= createAction(
  '[Submenu] Cargar Combo box Modal Opciones',
  props<{ opcionesList:IComboList}>()
);

export const deleteOpcionesSubmenu= createAction(
  '[Submenu] Delete Opciones Submenu',
  props<{ id:string, idOpcion:string, submenuNombre:string}>()
);

export const deleteOpcionesSubmenuSuccess= createAction(
  '[Submenu] Delete Opciones Submenu Success',
  props<{ id:string, submenuNombre:string}>()
);

export const deleteOpcionesSubmenuFail= createAction(
  '[Submenu] Delete Opciones Submenu Fail',
  props<{ error:any}>()
);

export const agregarOpcionesSubmenu= createAction(
  '[Submenu] Agregar Opciones Submenu',
  props<{ id:string,idOpcion:string, items:string[]}>()
);

export const agregarOpcionesSubmenuSuccess= createAction(
  '[Submenu] Agregar Opciones Submenu Success',
  props<{ id:string}>()
);

export const agregarOpcionesSubmenuFail= createAction(
  '[Submenu] Agregar Opciones Submenu Fail',
  props<{error:any}>()
);
