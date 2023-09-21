import { createAction, props } from "@ngrx/store";
import { IOpcion } from "../../interfaces/opcion.interface";
import { FormType, IDataGridSource } from "ngx-sigape";


export const CargarListadoDeOpciones= createAction(
  '[Opcion] Cargar Listado',
  props<{ page:number, pageSize:number }>()
);

export const CargarListadoDeOpcionesSuccess= createAction(
  '[Opcion] Cargar Listado Success',
  props<{ listado:IDataGridSource<IOpcion>}>()
);

export const CargarListadoDeOpcionesFail= createAction(
  '[Opcion] Cargar Listado Fail',
  props<{ error : any}>()
);

export const CargarModalOpcion= createAction(
  '[Opcion] Cargar Modal Opcion',
  props<{ tipoFormulario:FormType, title:string }>()
);

export const AgregarOpcion= createAction(
  '[Opcion] Agregar Opcion',
  props<{ nombre:string, icono:string, esEmergente:boolean, tieneOpciones:boolean,page:number, pageSize:number }>()
);

export const AgregarOpcionSuccess= createAction(
  '[Opcion] Agregar Opcion Success',
  props<{ opcion : IOpcion,page:number, pageSize:number}>()
);

export const AgregarOpcionFail= createAction(
  '[Opcion] Agregar Opcion Fail',
  props<{ error : any}>()
);

export const SetModalReadOnly= createAction(
  '[Opcion] Set Modal Read Only',
  props<{ id : string}>()
);

export const SetModalEditar= createAction(
  '[Opcion] Set Modal Editar',
  props<{ id : string}>()
);

export const CargarDataModalSuccess= createAction(
  '[Opcion] Cargar Data Modal Success',
  props<{ opcion : IOpcion}>()
);

export const EstadoInicialModal= createAction(
  '[Opcion] Estado Inicial Modal'
);

export const EliminarOpcion= createAction(
  '[Opcion] Eliminar Opcion ',
  props<{ id: string, page:number, pageSize:number}>()
);

export const EliminarOpcionSuccess= createAction(
  '[Opcion] Eliminar Opcion Success',
  props<{ opcion: IOpcion, page:number, pageSize:number}>()
);

export const EliminarOpcionFail= createAction(
  '[Opcion] Eliminar Opcion Fail',
  props<{ error: any}>()
);

export const EditarOpcion= createAction(
  '[Opcion] Editar Opcion ',
  props<{ id: string, nombre:string, icono:string, esEmergente:boolean, tieneOpciones:boolean, page:number, pageSize:number}>()
);

export const EditarOpcionSuccess= createAction(
  '[Opcion] Editar Opcion Success',
  props<{ opcion: IOpcion, page:number, pageSize:number}>()
);

export const EditarOpcionFail= createAction(
  '[Opcion] Editar Opcion Fail',
  props<{ error: any}>()
);

export const BuscarOpcion= createAction(
  '[Opcion] Buscar Opcion ',
  props<{nombre:string, icono:string, esEmergente:boolean, pageSize:number}>()
);

export const BuscarOpcionSuccess= createAction(
  '[Opcion] Buscar Opcion Success',
  props<{ listado:IDataGridSource<IOpcion>}>()
);

export const BuscarOpcionFail= createAction(
  '[Opcion] Buscar Opcion Fail',
  props<{ error:any}>()
);
