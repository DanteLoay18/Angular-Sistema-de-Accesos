import { createAction, props } from "@ngrx/store";
import { IComboList, IDataGridColumnDefinition, IDataGridSource } from "ngx-sigape";
import { IFormMenuSistema, IMenu } from "../../interfaces/menu.interface";
import { ISistema } from "@sac/core";



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

export const setModalSistema= createAction(
  '[Menu] Set Modal MenuSistema',
  props<{ id:string, menuNombre:string}>()
)

export const SetModalSistemaSuccess= createAction(
  '[Menu] Set Modal Sistema Success',
  props<{ sistema: any, cantidad:number }>()
);

export const SetModalSistemaFail= createAction(
  '[Menu] Set Modal Sistema Success',
  props<{ error: any }>()
);


export const SetModalSistemaVacio= createAction(
  '[Menu] Set Modal Sistema Vacio',
  props<{ cantidad:number}>()
);

export const CargarComboBoxModalSistema= createAction(
  '[Menu] Cargar Combo box Modal Sistema',
  props<{ sistemasList:IComboList}>()
);

export const deleteSistemaMenu= createAction(
  '[Menu] Delete sistema Menu',
  props<{ id:string, idSistema:string}>()
);

export const deleteSistemaMenuSuccess= createAction(
  '[Menu] Delete sistema Menu Success'
);

export const deleteSistemaMenuFail= createAction(
  '[Menu] Delete sistema Menu Fail',
  props<{ error:any}>()
);

export const agregarSistemaMenu= createAction(
  '[Menu] Agregar sistema Menu',
  props<{ id:string,idSistema:string}>()
);

export const agregarSistemaMenuSuccess= createAction(
  '[Menu] Agregar sistema Menu Success',
  props<{ id:string}>()
);

export const agregarSistemaMenuFail= createAction(
  '[Menu] Agregar sistema Menu Fail',
  props<{error:any}>()
);

export const irASubmenuMenu= createAction(
  '[Menu] Ir A submenu',
  props<{id:string}>()
);

export const RegresarAMenus =  createAction(
  '[Menu] Regresar A Menus',
);
