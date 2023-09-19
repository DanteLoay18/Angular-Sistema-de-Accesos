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
  props<{ nombre:string, icono:string, esEmergente:boolean, tieneOpciones:boolean }>()
);

export const AgregarOpcionSuccess= createAction(
  '[Opcion] Agregar Opcion Success',
  props<{ opcion : IOpcion}>()
);

export const AgregarOpcionFail= createAction(
  '[Opcion] Agregar Opcion Fail',
  props<{ error : any}>()
);

export const setModalReadOnly= createAction(
  '[Opcion] Set Modal Read Only'
);
