import { createAction, props } from "@ngrx/store";
import { IDataGridColumnDefinition, IDataGridSource } from "ngx-sigape";
import { IMenu } from "../../interfaces/menu.interface";



export const CargarListadoDeMenus= createAction(
  '[Menu] Cargar Listado',
  props<{ page:number, pageSize:number }>()
);

export const CargarListadoDeMenusSuccess= createAction(
  '[Menu] Cargar Listado Success',
  props<{ listado:IDataGridSource<IMenu>}>()
);

export const CargarListadoDeMenusFail= createAction(
  '[Menu] Cargar Listado Fail',
  props<{ error : any}>()
);

export const AgregarMenu= createAction(
  '[Menu] Agregar Menu',
  props<{ nombre:string, icono:string, url:string, esSubmenu:boolean,page:number, pageSize:number}>()
);

export const AgregarMenuSuccess= createAction(
  '[Menu] Agregar Menu Success',
  props<{ page:number, pageSize:number}>()
);

export const AgregarMenuFail= createAction(
  '[Menu] Agregar Menu Fail',
  props<{ error : any}>()
);

export const SetModalReadOnly= createAction(
  '[Menu] Set Modal Read Only',
  props<{ id : string}>()
);

export const SetModalEditar= createAction(
  '[Menu] Set Modal Editar',
  props<{ id : string}>()
);

export const SetModalNuevo= createAction(
  '[Menu] Set Modal Nuevo'
);

export const CargarDataModalSuccess= createAction(
  '[Menu] Cargar Data Modal Success',
  props<{ menu : IMenu}>()
);

export const EstadoInicialModal= createAction(
  '[Menu] Estado Inicial Modal'
);

export const EliminarMenu= createAction(
  '[Menu] Eliminar Menu ',
  props<{ id: string, page:number, pageSize:number}>()
);

export const EliminarMenuSuccess= createAction(
  '[Menu] Eliminar Menu Success',
  props<{ page:number, pageSize:number}>()
);

export const EliminarMenuFail= createAction(
  '[Menu] Eliminar Menu Fail',
  props<{ error: any}>()
);

export const EditarMenu= createAction(
  '[Menu] Editar Menu ',
  props<{ id: string, nombre:string, icono:string, url:string, page:number, pageSize:number}>()
);

export const EditarMenuSuccess= createAction(
  '[Menu] Editar Menu Success',
  props<{ page:number, pageSize:number}>()
);

export const EditarMenuFail= createAction(
  '[Menu] Editar Menu Fail',
  props<{ error: any}>()
);

export const BuscarMenu= createAction(
  '[Menu] Buscar Menu ',
  props<{nombre:string, icono:string, url:string, page:number,pageSize:number}>()
);

export const BuscarMenuSuccess= createAction(
  '[Menu] Buscar Menu Success',
  props<{ listado:IDataGridSource<IMenu>}>()
);

export const BuscarMenuFail= createAction(
  '[Menu] Buscar Menu Fail',
  props<{ error:any}>()
);

export const CargarForm = createAction(
  '[Menu] Cargar Form',
  props<{ currentForm: string}>()
)

export const CargarFormMenus = createAction(
  '[Menu] Cargar Form Menus',
  props<{ opciones: any[]}>()
)

export const CargarDataGridMenus = createAction(
  '[Menu] Cargar Data Grid Column de Menus',
  props<{ columna: IDataGridColumnDefinition}>()
)