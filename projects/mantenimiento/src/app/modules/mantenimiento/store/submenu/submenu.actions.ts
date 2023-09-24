import { createAction, props } from "@ngrx/store";
import { IDataGridColumnDefinition, IDataGridSource } from "ngx-sigape";
import { IMenu } from "../../interfaces/menu.interface";



export const CargarListadoDeSubmenus= createAction(
  '[Submenu] Cargar Listado',
  props<{ page:number, pageSize:number }>()
);

export const CargarListadoDeSubmenusSuccess= createAction(
  '[Submenu] Cargar Listado Success',
  props<{ listado:IDataGridSource<IMenu>}>()
);

export const CargarListadoDeSubmenusFail= createAction(
  '[Submenu] Cargar Listado Fail',
  props<{ error : any}>()
);

export const AgregarSubmenu= createAction(
  '[Submenu] Agregar Submenu',
  props<{ nombre:string, esSubmenu:boolean,page:number, pageSize:number}>()
);

export const AgregarSubmenuSuccess= createAction(
  '[Submenu] Agregar Submenu Success',
  props<{ page:number, pageSize:number}>()
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
  props<{ menu : IMenu}>()
);

export const EstadoInicialModal= createAction(
  '[Submenu] Estado Inicial Modal'
);

export const EliminarSubmenu= createAction(
  '[Submenu] Eliminar Submenu ',
  props<{ id: string, page:number, pageSize:number}>()
);

export const EliminarSubmenuSuccess= createAction(
  '[Submenu] Eliminar Submenu Success',
  props<{ page:number, pageSize:number}>()
);

export const EliminarSubmenuFail= createAction(
  '[Submenu] Eliminar Submenu Fail',
  props<{ error: any}>()
);

export const EditarSubmenu= createAction(
  '[Submenu] Editar Submenu ',
  props<{ id: string, nombre:string, page:number, pageSize:number}>()
);

export const EditarSubmenuSuccess= createAction(
  '[Submenu] Editar Submenu Success',
  props<{ page:number, pageSize:number}>()
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
  props<{ listado:IDataGridSource<IMenu>}>()
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
