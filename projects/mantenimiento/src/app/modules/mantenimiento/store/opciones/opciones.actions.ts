import { createAction, props } from "@ngrx/store";
import { IDataGridElement, IDataGridSource } from "ngx-sigape";
import { IOpcion } from "../../interfaces/opcion.interface";


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
