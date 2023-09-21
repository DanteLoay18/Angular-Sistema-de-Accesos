
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
    esBusqueda:false,
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
       form: new Opcion(),
       codigoOpcion:''
    }
};

export const SessionReducer = createReducer(
  estadoInicial,
  on(opcionesActions.CargarListadoDeOpciones, (state) => ({...state, loading:true, esBusqueda:false})),
  on(opcionesActions.CargarListadoDeOpcionesSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(opcionesActions.CargarListadoDeOpcionesFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(opcionesActions.AgregarOpcion, (state) => ({...state, modalOpcion:{ ...state.modalOpcion,isLoading:true}})),
  on(opcionesActions.AgregarOpcionSuccess, (state, { opcion }) => ({ ...state, modalOpcion:{ ...state.modalOpcion,isLoading:false, error:null}})),
  on(opcionesActions.AgregarOpcionFail, (state, {error}) => ({ ...state, modalOpcion:{ ...state.modalOpcion,isLoading:false, error:error} })),
  on(opcionesActions.CargarModalOpcion, (state, {title, tipoFormulario})=> ({...state, modalOpcion:{ ...state.modalOpcion, title, type:tipoFormulario}})),
  on(opcionesActions.SetModalReadOnly, (state,{id})=> ({...state, modalOpcion:{ ...state.modalOpcion, title:'Consulta de Opcion', isLoading:true, type:FormType.CONSULTAR, codigoOpcion:id}})),
  on(opcionesActions.SetModalEditar, (state,{id})=> ({...state, modalOpcion:{ ...state.modalOpcion, title:'Editar Opcion ', isLoading:true, type:FormType.EDITAR, codigoOpcion:id}})),
  on(opcionesActions.CargarDataModalSuccess, (state,{opcion})=> ({...state, modalOpcion:{ ...state.modalOpcion, form: Opcion.createOpcion(opcion.nombre, opcion.icono, opcion.esEmergente), isLoading:false}})),
  on(opcionesActions.EliminarOpcion, (state)=> ({...state})),
  on(opcionesActions.EliminarOpcionSuccess, (state,{opcion})=> ({...state})),
  on(opcionesActions.EliminarOpcionFail, (state,{error})=> ({...state})),
  on(opcionesActions.EditarOpcion, (state)=> ({...state})),
  on(opcionesActions.EditarOpcionSuccess, (state,{opcion})=> ({...state})),
  on(opcionesActions.EditarOpcionFail, (state,{error})=> ({...state})),
  on(opcionesActions.EstadoInicialModal, (state) =>({...state, modalOpcion:estadoInicial.modalOpcion})),
  on(opcionesActions.BuscarOpcion, (state) => ({...state, loading:true, esBusqueda:true})),
  on(opcionesActions.BuscarOpcionSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(opcionesActions.BuscarOpcionFail, (state, { error }) => ({ ...state, loading:false,error:error  })),
  );

