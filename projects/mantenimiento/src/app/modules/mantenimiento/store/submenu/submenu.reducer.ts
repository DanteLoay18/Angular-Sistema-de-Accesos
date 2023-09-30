
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
  },
  modalExtra:{
    title: 'Opciones al que pertence',
    isLoading: false,
    error: null,
    type: null,
    form: new Menu(),
    gridDefinition: {
            columns: [

            { label: 'Nombre', field: 'nombre' },
            {  label: 'Acciones', field: 'buttons',
              buttons: [
                {
                  action: 'ELIMINAR',
                  icon: 'delete',
                  color: "primary",
                  tooltip: 'Eliminar',
                }
              ]}
        ],
      },
    source: {
        items: [
        ],
        page: 1,
        pageSize: 10,
        total: 0,
        orderBy: undefined,
        orderDir: undefined
    },
    idMenu: '',
    submenuNombre:'',
    comboLists: {
      opciones: {},
    }
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
  on(SubmenuActions.limpiarItemsTabla, (state)=> ({...state, source:{items:[]}})),
  on(SubmenuActions.setModalOpciones, (state, {id,submenuNombre})=>({...state, modalExtra:{...state.modalExtra, idMenu:id,type:FormType.REGISTRAR,submenuNombre, isLoading:true}})),
  on(SubmenuActions.SetModalOpcionesSuccess, (state,{opciones,cantidad})=>({...state, modalExtra:{...state.modalExtra, source:{
                                                                                                      ...state.source,
                                                                                                      items:[
                                                                                                        ...opciones
                                                                                                      ],
                                                                                                      total:cantidad
                                                                                                      },
                                                                                                      isLoading:true}})),
  on(SubmenuActions.SetModalOpcionesFail, (state, {error})=>({...state, modalExtra:{...state.modalExtra, error, isLoading:false}})),
  on(SubmenuActions.CargarComboBoxModalOpciones, (state, {opcionesList})=>({...state, modalExtra:{...state.modalExtra,isLoading:false,  comboLists: {
                                                                                                                          opciones:{...opcionesList}
                                                                                                                        }}})),
  on(SubmenuActions.deleteOpcionesSubmenu, (state)=>({...state, modalExtra:{...state.modalExtra,isLoading:true}})),
  on(SubmenuActions.deleteOpcionesSubmenuSuccess, (state,)=>({...state, modalExtra:{...state.modalExtra,isLoading:false}})),
  on(SubmenuActions.deleteOpcionesSubmenuFail, (state, {error})=>({...state, modalExtra:{...state.modalExtra,isLoading:false, error }})),
  on(SubmenuActions.agregarOpcionesSubmenu, (state)=>({...state, modalExtra:{...state.modalExtra,isLoading:true}})),
  on(SubmenuActions.agregarOpcionesSubmenuSuccess, (state,)=>({...state, modalExtra:{...state.modalExtra,isLoading:false}})),
  on(SubmenuActions.agregarOpcionesSubmenuFail, (state, {error})=>({...state, modalExtra:{...state.modalExtra,isLoading:false, error }})),

  );
