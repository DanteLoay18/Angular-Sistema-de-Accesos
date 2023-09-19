
import { IOpcion } from "../../interfaces/opcion.interface";
import { createReducer, on } from "@ngrx/store";
import * as opcionesActions from './opciones.actions'
import { IDataGridElement } from "../../interfaces/dataGridElement.interface";
import { FormType } from "ngx-sigape";
import { Opcion } from "../../components/agregar-opcion/agregar-opcion.component";






export const estadoInicial: IDataGridElement<IOpcion>= {
    error: null,
    loading: false,
    definition: {
        columns: [

            { label: 'Nombre', field: 'nombre' },
            { label: 'Icono', field: 'icono' },
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
    },
    modalOpcion :{
       title:'',
       isLoading:false,
       error:null,
       type:null,
       form: new Opcion()
    }
};

export const SessionReducer = createReducer(
  estadoInicial,
  on(opcionesActions.CargarListadoDeOpciones, (state) => ({...state, loading:true})),
  on(opcionesActions.CargarListadoDeOpcionesSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(opcionesActions.CargarListadoDeOpcionesFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(opcionesActions.AgregarOpcion, (state) => ({...state, loading:true})),
  on(opcionesActions.AgregarOpcionSuccess, (state, { opcion }) => ({ ...state, loading:false,error:null })),
  on(opcionesActions.AgregarOpcionFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(opcionesActions.CargarModalOpcion, (state, {title, tipoFormulario})=> ({...state, modalOpcion:{ ...state.modalOpcion, title, type:tipoFormulario}}))
);

