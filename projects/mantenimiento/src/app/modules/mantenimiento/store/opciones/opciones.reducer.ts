
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
            { label: 'Emergente', field: 'esEmergente' }

        ]
    },
    busqueda:{
      esBusqueda:false,
      nombre:"",
      icono:"",
      esEmergente:null
    },
    current:{
      currentForm:"",
      isLoading:false,
      opciones:[]
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
       form: new Opcion(),
       codigoOpcion:''
    }
};

export const SessionReducer = createReducer(
  estadoInicial,
  on(opcionesActions.CargarListadoDeOpciones, (state) => ({...state, loading:true, busqueda:{...state.busqueda, esBusqueda:false} })),
  on(opcionesActions.CargarListadoDeOpcionesSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(opcionesActions.CargarListadoDeOpcionesFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(opcionesActions.AgregarOpcion, (state) => ({...state, modalOpcion:{ ...state.modalOpcion,isLoading:true}})),
  on(opcionesActions.AgregarOpcionSuccess, (state, { opcion }) => ({ ...state,busqueda:{...state.busqueda,  esBusqueda:false}, modalOpcion:{ ...state.modalOpcion,isLoading:false, error:null}})),
  on(opcionesActions.AgregarOpcionFail, (state, {error}) => ({ ...state, modalOpcion:{ ...state.modalOpcion,isLoading:false, error:error} })),
  on(opcionesActions.CargarModalOpcion, (state, {title, tipoFormulario})=> ({...state, modalOpcion:{ ...state.modalOpcion, title, type:tipoFormulario}})),
  on(opcionesActions.SetModalReadOnly, (state,{id})=> ({...state, modalOpcion:{ ...state.modalOpcion, title:'Consulta de Opcion', isLoading:true, type:FormType.CONSULTAR, codigoOpcion:id}})),
  on(opcionesActions.SetModalEditar, (state,{id})=> ({...state, modalOpcion:{ ...state.modalOpcion, title:'Editar Opcion ', isLoading:true, type:FormType.EDITAR, codigoOpcion:id}})),
  on(opcionesActions.CargarDataModalSuccess, (state,{opcion})=> ({...state, modalOpcion:{ ...state.modalOpcion, form: Opcion.createOpcion(opcion.nombre, opcion.icono, opcion.esEmergente), isLoading:false}})),
  on(opcionesActions.EliminarOpcion, (state)=> ({...state})),
  on(opcionesActions.EliminarOpcionSuccess, (state,{opcion})=> ({...state,busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(opcionesActions.EliminarOpcionFail, (state,{error})=> ({...state})),
  on(opcionesActions.EditarOpcion, (state)=> ({...state})),
  on(opcionesActions.EditarOpcionSuccess, (state,{opcion})=> ({...state, busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(opcionesActions.EditarOpcionFail, (state,{error})=> ({...state})),
  on(opcionesActions.EstadoInicialModal, (state) =>({...state, modalOpcion:estadoInicial.modalOpcion})),
  on(opcionesActions.BuscarOpcion, (state, {nombre, icono, esEmergente}) => ({...state,busqueda:{...state.busqueda, nombre, icono, esEmergente}, loading:true})),
  on(opcionesActions.BuscarOpcionSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado , busqueda:{...state.busqueda, esBusqueda:true}  })),
  on(opcionesActions.BuscarOpcionFail, (state, { error }) => ({ ...state, loading:false,error:error, busqueda:{...state.busqueda, esBusqueda:false}  })),
  on(opcionesActions.CargarForm, (state, {currentForm})=>({...state, current:{...state.current, currentForm, isLoading:true}})),
  on(opcionesActions.CargarFormOpciones, (state, {opciones})=>({...state, loading:true ,current:{...state.current, opciones, isLoading:false}})),
  on(opcionesActions.CargarDataGridOpciones, (state, {columna})=> ({...state, loading:false, definition:{
                                                                                                  columns:[
                                                                                                    ...estadoInicial.definition.columns,
                                                                                                    columna
                                                                                                  ]
                                                                                                }}))

  );

