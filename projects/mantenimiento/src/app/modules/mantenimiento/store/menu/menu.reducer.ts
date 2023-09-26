
import { IDataGridElement } from "../../interfaces/dataGridElement.interface";
import { Sistema } from "../../classes";
import { createReducer, on } from "@ngrx/store";
import * as MenuActions from './menu.actions'
import { FormType } from "ngx-sigape";

import { Menu } from "../../classes/menu.class";
import { IMenu } from "../../interfaces/menu.interface";

export const estadoInicial: IDataGridElement<IMenu>= {
  error: null,
  loading: false,
  definition: {
      columns: [

          { label: 'Nombre', field: 'nombre' },
          { label: 'Icono', field: 'icono' },
          { label: 'Url', field: 'url' },
          { label: 'N° de submenus', field: 'submenus' },

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
     form: new Menu(),
     codigoSistema:''
  },
  modalSistema:{
    title: 'Sistema al que pertence',
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
    menuNombre:'',
    comboLists: {
      sistemas: {},
    }
  }
};


export const MenuReducer = createReducer(
  estadoInicial,
  on(MenuActions.CargarListadoDeMenus, (state) => ({...state, loading:true, busqueda:{...state.busqueda, esBusqueda:false} })),
  on(MenuActions.CargarListadoDeMenusSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado  })),
  on(MenuActions.CargarListadoDeMenusFail, (state, {error}) => ({ ...state, loading:false, error:error })),
  on(MenuActions.AgregarMenu, (state) => ({...state, modal:{ ...state.modal,isLoading:true}})),
  on(MenuActions.AgregarMenuSuccess, (state) => ({ ...state,busqueda:{...state.busqueda,  esBusqueda:false}, modal:{ ...state.modal,isLoading:false, error:null}})),
  on(MenuActions.AgregarMenuFail, (state, {error}) => ({ ...state, modal:{ ...state.modal,isLoading:false, error:error} })),
  on(MenuActions.SetModalNuevo, (state)=> ({...state, modal:{ ...state.modal, title:"Agregar Menu", type:FormType.REGISTRAR}})),
  on(MenuActions.SetModalReadOnly, (state,{id})=> ({...state, modal:{ ...state.modal, title:'Consulta de Menu', isLoading:true, type:FormType.CONSULTAR, codigoOpcion:id}})),
  on(MenuActions.SetModalEditar, (state,{id})=> ({...state, modal:{ ...state.modal, title:'Editar Menu ', isLoading:true, type:FormType.EDITAR, codigoOpcion:id}})),
  on(MenuActions.CargarDataModalSuccess, (state,{menu})=> ({...state, modal:{ ...state.modal, form: Menu.createMenu(menu.nombre, menu.icono!, menu.url!), isLoading:false}})),
  on(MenuActions.EliminarMenu, (state)=> ({...state})),
  on(MenuActions.EliminarMenuSuccess, (state)=> ({...state,busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(MenuActions.EliminarMenuFail, (state)=> ({...state})),
  on(MenuActions.EditarMenu, (state)=> ({...state})),
  on(MenuActions.EditarMenuSuccess, (state)=> ({...state, busqueda:{...state.busqueda,  esBusqueda:false}})),
  on(MenuActions.EditarMenuFail, (state)=> ({...state})),
  on(MenuActions.EstadoInicialModal, (state) =>({...state, modal:estadoInicial.modal})),
  on(MenuActions.BuscarMenu, (state, {nombre, icono, url}) => ({...state,busqueda:{...state.busqueda, nombre, icono, url}, loading:true})),
  on(MenuActions.BuscarMenuSuccess, (state, { listado }) => ({ ...state, loading:false,error:null, source:listado , busqueda:{...state.busqueda, esBusqueda:true}  })),
  on(MenuActions.BuscarMenuFail, (state, { error }) => ({ ...state, loading:false,error:error, busqueda:{...state.busqueda, esBusqueda:false}  })),
  on(MenuActions.CargarForm, (state, {currentForm})=>({...state, current:{...state.current, currentForm, isLoading:true}})),
  on(MenuActions.CargarFormMenus, (state, {opciones})=>({...state, loading:true ,current:{...state.current, opciones, isLoading:false}})),
  on(MenuActions.CargarDataGridMenus, (state, {columna})=> ({...state, loading:false, definition:{
                                                                                                  columns:[
                                                                                                    ...estadoInicial.definition.columns,
                                                                                                    columna
                                                                                                  ]
                                                                                                }})),
  on(MenuActions.setModalSistema, (state, {id,menuNombre})=>({...state, modalSistema:{...state.modalSistema, idMenu:id,type:FormType.REGISTRAR,menuNombre, isLoading:true}})),
  on(MenuActions.SetModalSistemaSuccess, (state,{sistema,cantidad})=>({...state, modalSistema:{...state.modalSistema, source:{
                                                                                                      ...state.source,
                                                                                                      items:[
                                                                                                       sistema
                                                                                                      ],
                                                                                                      total:cantidad
                                                                                                      },
                                                                                                      isLoading:true}})),
  on(MenuActions.SetModalSistemaFail, (state, {error})=>({...state, modalSistema:{...state.modalSistema, error, isLoading:false}})),
  on(MenuActions.SetModalSistemaVacio, (state,{cantidad})=>({...state, modalSistema:{...state.modalSistema, source:{
                                                                                                        ...state.source,
                                                                                                        items:[

                                                                                                        ],
                                                                                                        total:cantidad
                                                                                                        },

                                                                                                        isLoading:false}})),
  on(MenuActions.CargarComboBoxModalSistema, (state, {sistemasList})=>({...state, modalSistema:{...state.modalSistema,isLoading:false,  comboLists: {
                                                                                                                          sistemas:{...sistemasList}
                                                                                                                        }}})),
  );
