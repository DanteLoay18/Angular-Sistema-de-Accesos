import { IDataGridElement } from "ngx-sigape";
import { IOpcion } from "../../interfaces/opcion.interface";
import { createReducer, on } from "@ngrx/store";
import * as opcionesActions from './opciones.actions'






export const estadoInicial: IDataGridElement<IOpcion>= {
  error: null,
    loading: false,
    definition: {
        columns: [

            { label: 'Nombre', field: 'nombre' },
            { label: 'Icono', field: 'icono' },
            { label: 'Tiene Opciones', field: 'tieneOpciones' },
            { label: 'Emergente', field: 'esEmergente' },
            {
              label: 'Acciones',
              field: 'buttons',
              buttons: [
                  {
                    action: "EDITAR",
                    icon: "edit",
                    color: "primary",
                    tooltip: "Editar",
                },
                {
                  action: "CONSULTAR",
                  icon: "search",
                  color: "primary",
                  tooltip: "Consultar",
              },
              {
                action: "ELIMINAR",
                icon: "delete",
                color: "primary",
                tooltip: "Eliminar",
            }
              ]
          },
        ]
    },
    source: {
        items: [
        ],
        page: 0,
        pageSize: 0,
        total: 0,
        orderBy: undefined,
        orderDir: undefined
    }
};

export const SessionReducer = createReducer(
  estadoInicial,
  on(opcionesActions.CargarListadoDeOpciones, (state) => ({...state, loading:true})),
  on(opcionesActions.CargarListadoDeOpcionesSuccess, (state, { listado }) => ({ ...state, loading:false, source:listado  })),
  on(opcionesActions.CargarListadoDeOpcionesFail, (state, {error}) => ({ ...state, loading:false, error:error })),
);

