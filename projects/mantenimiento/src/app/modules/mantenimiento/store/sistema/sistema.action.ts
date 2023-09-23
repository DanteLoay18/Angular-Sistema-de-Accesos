import { createAction, props } from "@ngrx/store";
import { IDataGridColumnDefinition, IDataGridSource } from "ngx-sigape";
import { ISistema } from "@sac/core";


export const CargarListadoDeSistemas= createAction(
  '[Sistema] Cargar Listado',
  props<{ page:number, pageSize:number }>()
);

export const CargarListadoDeSistemasSuccess= createAction(
  '[Sistema] Cargar Listado Success',
  props<{ listado:IDataGridSource<ISistema>}>()
);

export const CargarListadoDeSistemasFail= createAction(
  '[Sistema] Cargar Listado Fail',
  props<{ error : any}>()
);

export const AgregarSistema= createAction(
  '[Sistema] Agregar Sistema',
  props<{ nombre:string, icono:string, url:string, puerto:string, imagen:string,page:number, pageSize:number }>()
);

export const AgregarSistemaSuccess= createAction(
  '[Sistema] Agregar Sistema Success',
  props<{ page:number, pageSize:number}>()
);

export const AgregarSistemaFail= createAction(
  '[Sistema] Agregar Sistema Fail',
  props<{ error : any}>()
);

export const SetModalReadOnly= createAction(
  '[Sistema] Set Modal Read Only',
  props<{ id : string}>()
);

export const SetModalEditar= createAction(
  '[Sistema] Set Modal Editar',
  props<{ id : string}>()
);

export const SetModalNuevo= createAction(
  '[Sistema] Set Modal Nuevo'
);

export const CargarDataModalSuccess= createAction(
  '[Sistema] Cargar Data Modal Success',
  props<{ sistema : ISistema}>()
);

export const EstadoInicialModal= createAction(
  '[Sistema] Estado Inicial Modal'
);

export const EliminarSistema= createAction(
  '[Sistema] Eliminar Sistema ',
  props<{ id: string, page:number, pageSize:number}>()
);

export const EliminarSistemaSuccess= createAction(
  '[Sistema] Eliminar Sistema Success',
  props<{ page:number, pageSize:number}>()
);

export const EliminarSistemaFail= createAction(
  '[Sistema] Eliminar Sistema Fail',
  props<{ error: any}>()
);

export const EditarSistema= createAction(
  '[Sistema] Editar Sistema ',
  props<{ id: string, nombre:string, icono:string, url:string, puerto:string, imagen:string, page:number, pageSize:number}>()
);

export const EditarSistemaSuccess= createAction(
  '[Sistema] Editar Sistema Success',
  props<{ page:number, pageSize:number}>()
);

export const EditarSistemaFail= createAction(
  '[Sistema] Editar Sistema Fail',
  props<{ error: any}>()
);

export const BuscarSistema= createAction(
  '[Sistema] Buscar Sistema ',
  props<{nombre:string, icono:string, url:string, puerto:string, page:number,pageSize:number}>()
);

export const BuscarSistemaSuccess= createAction(
  '[Sistema] Buscar Sistema Success',
  props<{ listado:IDataGridSource<ISistema>}>()
);

export const BuscarSistemaFail= createAction(
  '[Sistema] Buscar Sistema Fail',
  props<{ error:any}>()
);

export const CargarForm = createAction(
  '[Sistema] Cargar Form',
  props<{ currentForm: string}>()
)

export const CargarFormSistemas = createAction(
  '[Sistema] Cargar Form Sistemas',
  props<{ opciones: any[]}>()
)

export const CargarDataGridSistemas = createAction(
  '[Sistema] Cargar Data Grid Column de Sistemas',
  props<{ columna: IDataGridColumnDefinition}>()
)
