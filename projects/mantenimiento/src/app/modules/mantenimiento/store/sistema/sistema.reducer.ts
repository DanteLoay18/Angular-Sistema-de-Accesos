
import { IDataGridElement } from "../../interfaces/dataGridElement.interface";
import { Sistema } from "../../classes";
import { createReducer, on } from "@ngrx/store";
import * as sistemaActions from './sistema.action'
import { FormType } from "ngx-sigape";
import { ISistema } from "../../interfaces/sistema.interface";

export const estadoInicial: IDataGridElement<ISistema>= {
  error: null,
  loading: false,
  definition: {
      columns: [

          { label: 'Nombre', field: 'nombre' },
          { label: 'Icono', field: 'icono' },
          { label: 'Url', field: 'url' },
          { label: 'Puerto', field: 'puerto' }

      ]
  },
  busqueda:{
    esBusqueda:false,
    nombre:"",
    icono:"",
    url:"",
    puerto:""
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
  modal :{
     title:'',
     isLoading:false,
     error:null,
     type:null,
     form: new Sistema(),
     codigoSistema:''
  }
};


export const SistemaReducer = createReducer(
  estadoInicial,
  on(sistemaActions.CargarListadoDeSistemas, (state) => ({...state, loading:true, busqueda:{...state.busqueda, esBusqueda:false} })),
  on(sistemaActions.CargarListadoDeSistemasSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(sistemaActions.CargarListadoDeSistemasFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(sistemaActions.AgregarSistema, (state) => ({...state, modal:{ ...state.modal,isLoading:true}})),
  on(sistemaActions.AgregarSistemaSuccess, (state) => ({ ...state,busqueda:{...state.busqueda,  esBusqueda:false}, modal:{ ...state.modal,isLoading:false, error:null}})),
  on(sistemaActions.AgregarSistemaFail, (state, {error}) => ({ ...state, modal:{ ...state.modal,isLoading:false, error:error} })),
  on(sistemaActions.SetModalNuevo, (state)=> ({...state, modal:{ ...state.modal, title:"Agregar Sistema", type:FormType.REGISTRAR}})),
  on(sistemaActions.SetModalReadOnly, (state,{id})=> ({...state, modal:{ ...state.modal, title:'Consulta de Opcion', isLoading:true, type:FormType.CONSULTAR, codigoOpcion:id}})),
  on(sistemaActions.SetModalEditar, (state,{id})=> ({...state, modal:{ ...state.modal, title:'Editar Opcion ', isLoading:true, type:FormType.EDITAR, codigoOpcion:id}})),
  on(sistemaActions.CargarDataModalSuccess, (state,{sistema})=> ({...state, modal:{ ...state.modal, form: Sistema.createSistema(sistema.nombre, sistema.icono, sistema.puerto, sistema.url, sistema.imagen), isLoading:false}})),
  on(sistemaActions.EliminarSistema, (state)=> ({...state})),
  on(sistemaActions.EliminarSistemaSuccess, (state)=> ({...state,busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(sistemaActions.EliminarSistemaFail, (state)=> ({...state})),
  on(sistemaActions.EditarSistema, (state)=> ({...state})),
  on(sistemaActions.EditarSistemaSuccess, (state)=> ({...state, busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(sistemaActions.EditarSistemaFail, (state,{error})=> ({...state})),
  on(sistemaActions.EstadoInicialModal, (state) =>({...state, modal:estadoInicial.modal})),
  on(sistemaActions.BuscarSistema, (state, {nombre, icono, url, puerto}) => ({...state,busqueda:{...state.busqueda, nombre, icono, url, puerto}, loading:true})),
  on(sistemaActions.BuscarSistemaSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado , busqueda:{...state.busqueda, esBusqueda:true}  })),
  on(sistemaActions.BuscarSistemaFail, (state, { error }) => ({ ...state, loading:false,error:error, busqueda:{...state.busqueda, esBusqueda:false}  })),
  on(sistemaActions.CargarForm, (state, {currentForm})=>({...state, current:{...state.current, currentForm, isLoading:true}})),
  on(sistemaActions.CargarFormSistemas, (state, {opciones})=>({...state, loading:true ,current:{...state.current, opciones, isLoading:false}})),
  on(sistemaActions.CargarDataGridSistemas, (state, {columna})=> ({...state, loading:false, definition:{
                                                                                                  columns:[
                                                                                                    ...estadoInicial.definition.columns,
                                                                                                    columna
                                                                                                  ]
                                                                                                }}))

  );
