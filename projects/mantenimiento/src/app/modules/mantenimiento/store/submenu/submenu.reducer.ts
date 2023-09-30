
import { IDataGridElement } from "../../interfaces/dataGridElement.interface";
import { Sistema } from "../../classes";
import { createReducer, on } from "@ngrx/store";
import * as SubmenuActions from './submenu.actions'
import { FormType } from "ngx-sigape";

import { Menu } from "../../classes/menu.class";
import {  IMenuResponse } from "../../interfaces/menu.interface";

export const estadoInicial: IDataGridElement<IMenuResponse>= {
  error: null,
  loading: false,
  definition: {
      columns: [

          { label: 'Nombre', field: 'nombre' },
          { label: 'N° de Opciones', field: 'opciones'}

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
    titulo:"",
    idMenu:"",
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
     form: new Menu(),
     codigoSubmenu:''
  }
};


export const SubmenuReducer = createReducer(
  estadoInicial,
  on(SubmenuActions.CargarListadoDeSubmenus, (state, {id, titulo}) => ({...state, loading:true, busqueda:{...state.busqueda, esBusqueda:false}, current:{idMenu:id, titulo} })),
  on(SubmenuActions.CargarListadoDeSubmenusSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(SubmenuActions.CargarListadoDeSubmenusFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(SubmenuActions.AgregarSubmenu, (state) => ({...state, modal:{ ...state.modal,isLoading:true}})),
  on(SubmenuActions.AgregarSubmenuSuccess, (state) => ({ ...state,busqueda:{...state.busqueda,  esBusqueda:false}, modal:{ ...state.modal,isLoading:false, error:null}})),
  on(SubmenuActions.AgregarSubmenuFail, (state, {error}) => ({ ...state, modal:{ ...state.modal,isLoading:false, error:error} })),
  on(SubmenuActions.SetModalNuevo, (state)=> ({...state, modal:{ ...state.modal, title:"Agregar Submenu", type:FormType.REGISTRAR}})),
  on(SubmenuActions.SetModalReadOnly, (state,{id})=> ({...state, modal:{ ...state.modal, title:'Consulta de Submenu', isLoading:true, type:FormType.CONSULTAR, codigoSubmenu:id}})),
  on(SubmenuActions.SetModalEditar, (state,{id})=> ({...state, modal:{ ...state.modal, title:'Editar Submenu ', isLoading:true, type:FormType.EDITAR, codigoSubmenu:id}})),
  on(SubmenuActions.CargarDataModalSuccess, (state,{menu})=> ({...state, modal:{ ...state.modal, form: Menu.createSubmenu(menu.nombre), isLoading:false}})),
  on(SubmenuActions.EliminarSubmenu, (state)=> ({...state})),
  on(SubmenuActions.EliminarSubmenuSuccess, (state)=> ({...state,busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(SubmenuActions.EliminarSubmenuFail, (state)=> ({...state})),
  on(SubmenuActions.EditarSubmenu, (state)=> ({...state})),
  on(SubmenuActions.EditarSubmenuSuccess, (state)=> ({...state, busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(SubmenuActions.EditarSubmenuFail, (state)=> ({...state})),
  on(SubmenuActions.EstadoInicialModal, (state) =>({...state, modal:estadoInicial.modal})),
  on(SubmenuActions.BuscarSubmenu, (state, {nombre}) => ({...state,busqueda:{...state.busqueda, nombre}, loading:true})),
  on(SubmenuActions.BuscarSubmenuSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado , busqueda:{...state.busqueda, esBusqueda:true}  })),
  on(SubmenuActions.BuscarSubmenuFail, (state, { error }) => ({ ...state, loading:false,error:error, busqueda:{...state.busqueda, esBusqueda:false}  })),
  on(SubmenuActions.CargarForm, (state, {currentForm})=>({...state, current:{...state.current, currentForm, isLoading:true}})),
  on(SubmenuActions.CargarFormSubmenus, (state, {opciones})=>({...state, loading:true ,current:{...state.current, opciones, isLoading:false}})),
  on(SubmenuActions.CargarDataGridSubmenus, (state, {columna})=> ({...state, loading:false, definition:{
                                                                                                  columns:[
                                                                                                    ...estadoInicial.definition.columns,
                                                                                                    columna
                                                                                                  ]
                                                                                                }})),
  on(SubmenuActions.limpiarItemsTabla, (state)=> ({...state, source:{items:[]}}))

  );
