import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService, DialogService } from 'ngx-sigape';
import * as MenusActions from '../../store/menu/menu.actions';
import * as SubmenusActions from '../../store/submenu/submenu.actions';
import { FormModalMenuComponent } from '../../components/form-modal-menu/form-modal-menu.component';
import { take, filter } from 'rxjs';
import { map } from 'rxjs/operators';
import {  IPerfiles, ISistema } from '@sac/core';
import { FormModalSubmenuComponent } from '../../components/form-modal-submenu/form-modal-submenu.component';
import { FormModalMenuSistemaComponent } from '../../components/form-modal-menu-sistema/form-modal-menu-sistema.component';
import { FormModalSubmenuOpcionesComponent } from '../../components/form-modal-submenu-opciones/form-modal-submenu-opciones.component';
@Component({
  selector: 'app-gestion-menus',
  templateUrl: './gestion-menus.component.html',
  styleUrls: ['./gestion-menus.component.scss']
})
export class GestionMenusComponent implements OnInit{
  private store= inject(Store);
  private alertService= inject(AlertService);
  private dialogService= inject(DialogService);
  state$ =  this.store.select('mantenimiento');
  stateSession$= this.store.select('session');
  sistemaId:string="";

  ngOnInit(): void {
    this.store.dispatch(MenusActions.CargarListadoDeMenus({page:1, pageSize:10}));
    this.store.select('globalConfig').subscribe(({guidSistema})=>{
      this.sistemaId=guidSistema
    })


    const menu = window.location.pathname.substring(1).toUpperCase();
    this.store.dispatch(MenusActions.CargarForm({currentForm:'menu'}))
    this.store.dispatch(SubmenusActions.CargarForm({currentForm:'menu'}))
    this.stateSession$.pipe(
        filter(({ user }) => user !== null),
        map(({ user }) => user.perfiles.filter(({ activo }:IPerfiles) => activo)),
        map((perfiles) =>
          perfiles.reduce((result:any, { perfil }:IPerfiles) => [...result, ...perfil.sistemas], [])
        )
      )
      .subscribe((sistemas) => {
        sistemas.forEach(({ id, menus }:ISistema) => {
          if (id === this.sistemaId) {
            menus.forEach(({ url, submenus }) => {
              if (url === menu) {
                submenus?.forEach(({nombre,opciones})=>{
                    if(nombre==="GESTION DE MENUS"){
                      const opcionesMenusArray = opciones
                                                        ?.filter(({ nombre, esEliminado }) => nombre !== "NUEVO" && esEliminado !== true)
                                                        .filter(({nombre, esEliminado})=> nombre!=="OPCIONES" && esEliminado !== true)
                                                        .map(({ nombre, icono }) => ({
                                                          action: nombre,
                                                          icon: icono.toLowerCase(),
                                                          color: "primary",
                                                          tooltip: this.capitalizarPalabras(nombre.toLowerCase()),
                                                        }))
                                                        .sort((a, b) => {
                                                          const order = ["SUBMENUS", "CONSULTAR", "EDITAR", "ELIMINAR"];
                                                          return order.indexOf(a.action) - order.indexOf(b.action);
                                                        });

                      const opcionesMenusCurrent= opciones?.filter(({nombre,esEliminado})=> nombre!=="OPCIONES" && esEliminado !==true);
                      const opcionesSubmenusArray = opciones
                                                        ?.filter(({ nombre, esEliminado }) => nombre !== "NUEVO" && esEliminado !== true)
                                                        .filter(({nombre, esEliminado})=> nombre!=="SUBMENUS" && esEliminado !== true)
                                                        .filter(({nombre, esEliminado})=> nombre!=="SISTEMA" && esEliminado !== true)
                                                        .map(({ nombre, icono }) => ({
                                                          action: nombre,
                                                          icon: icono.toLowerCase(),
                                                          color: "primary",
                                                          tooltip: this.capitalizarPalabras(nombre.toLowerCase()),
                                                        }))
                                                        .sort((a, b) => {
                                                          const order = ["OPCIONES", "CONSULTAR", "EDITAR", "ELIMINAR"];
                                                          return order.indexOf(a.action) - order.indexOf(b.action);
                                                        });

                      const opcionesSubmenusCurrent= opciones?.filter(({nombre,esEliminado})=> nombre!=="SUBMENUS" && esEliminado !==true);

                      this.store.dispatch(MenusActions.CargarFormMenus({ opciones: opcionesMenusCurrent! }));
                      this.store.dispatch(MenusActions.CargarDataGridMenus({
                        columna: {
                          label: 'Acciones',
                          field: 'buttons',
                          buttons: opcionesMenusArray,
                        },
                      }));
                      this.store.dispatch(SubmenusActions.CargarFormSubmenus({ opciones: opcionesSubmenusCurrent! }));
                      this.store.dispatch(SubmenusActions.CargarDataGridSubmenus({
                        columna: {
                          label: 'Acciones',
                          field: 'buttons',
                          buttons: opcionesSubmenusArray,
                        },
                      }));
                    }
                })
              }
            });
          }
        });
      });
  }

  capitalizarPalabras(texto: string): string {
    return texto.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  handleLoadDataMenu = (e:any) => {
    this.state$.pipe(take(1)).subscribe(({menu})=>{
      if(!menu.busqueda.esBusqueda){
        this.store.dispatch(MenusActions.EstadoInicialModal());
        this.store.dispatch(MenusActions.CargarListadoDeMenus({page:e.page, pageSize:e.pageSize}))
      }else{
        this.store.dispatch(MenusActions.BuscarMenu({nombre:menu.busqueda.nombre, icono:menu.busqueda.icono, url:menu.busqueda.url,page:e.page, pageSize:e.pageSize}))
      }
    })
  }

  handleLoadDataSubmenu = (e:any) => {
    this.state$.pipe(take(1)).subscribe(({submenu})=>{
      if(!submenu.busqueda.esBusqueda){
        this.store.dispatch(SubmenusActions.EstadoInicialModal());
        this.store.dispatch(SubmenusActions.CargarListadoDeSubmenus({id:submenu.current.idMenu,titulo:submenu.current.titulo,page:e.page, pageSize:e.pageSize}))
      }else{
        this.store.dispatch(SubmenusActions.BuscarSubmenu({nombre:submenu.busqueda.nombre,page:e.page, pageSize:e.pageSize}))
      }
    })
  }

  handleClickButton = (e: any) => {
		switch (e.action) {

			case 'EDITAR':
        if(!e.item.esSubmenu){
          this.openModalEditar(e.item._id);
        }else{
          this.openModalSubmenuEditar(e.item._id)
        }

      break;
      case 'CONSULTAR':
        if(!e.item.esSubmenu){
          this.openModalConsultar(e.item._id);
        }else{
          this.openModalSubmenuConsultar(e.item._id)
        }

      break;
      case 'ELIMINAR':
        if(!e.item.esSubmenu){
          this.handleDeleteMenu(e.item._id);
        }else{
          this.handleDeleteSubmenu(e.item._id);
        }
      break;
      case 'SISTEMA':
        this.handleModalMenuSistema(e.item._id, e.item.nombre)
        break;
      case 'SUBMENUS':
        this.handleSubmenuMenu(e.item._id,e.item.nombre)
        break;
      case 'OPCIONES':
        this.handleModalSubmenuOpciones(e.item._id, e.item.nombre)
        break;
      default:
        break;
		}
	};

  openModalConsultar(id:string){
    this.store.dispatch(MenusActions.SetModalReadOnly({id}));
    this.dialogService.open(FormModalMenuComponent,'md')
  }

  openModalSubmenuConsultar(id:string){
    this.store.dispatch(SubmenusActions.SetModalReadOnly({id}));
    this.dialogService.open(FormModalSubmenuComponent,'md')
  }

  openModalEditar(id:string){
    this.store.dispatch(MenusActions.SetModalEditar({id}));
    this.dialogService.open(FormModalMenuComponent,'md')
  }

  openModalSubmenuEditar(id:string){
    this.store.dispatch(SubmenusActions.SetModalEditar({id}));
    this.dialogService.open(FormModalSubmenuComponent,'md')
  }
  async handleDeleteMenu(id:string){
    let page:number;
    let pageSize:number;
    this.store.select('mantenimiento').subscribe(({menu})=>{
      page=menu.source.page;
      pageSize=menu.source.pageSize
    })
    this.alertService.open('¿Está seguro de eliminar el registro?', undefined, { confirm: true }).then((confirm) => {
      if (confirm) {
         this.store.dispatch(MenusActions.EliminarMenu({id,page,pageSize}));

      }
    });
  }

  async handleDeleteSubmenu(id:string){
    let page:number;
    let pageSize:number;
    let idMenu:string;
    this.store.select('mantenimiento').subscribe(({submenu})=>{
      page=submenu.source.page;
      pageSize=submenu.source.pageSize
      idMenu=submenu.current.idMenu
    })
    this.alertService.open('¿Está seguro de eliminar el registro?', undefined, { confirm: true }).then((confirm) => {
      if (confirm) {
         this.store.dispatch(SubmenusActions.EliminarSubmenu({id,idMenu,page,pageSize}));

      }
    });
  }

  handleModalSubmenuOpciones(id:string, submenuNombre:string){
    this.store.dispatch(SubmenusActions.setModalOpciones({id, submenuNombre}));
    this.dialogService.open(FormModalSubmenuOpcionesComponent,'md')
  }

  handleModalMenuSistema(id:string, menuNombre:string){
    this.store.dispatch(MenusActions.setModalSistema({id, menuNombre}));
    this.dialogService.open(FormModalMenuSistemaComponent,'md')
  }

  handleClickAgregarMenu(){

      this.store.dispatch(MenusActions.EstadoInicialModal());
      this.store.dispatch(MenusActions.SetModalNuevo())
      this.dialogService.open(FormModalMenuComponent,'md');

  }

  handleClickAgregarSubmenu(){

    this.store.dispatch(SubmenusActions.EstadoInicialModal());
    this.store.dispatch(SubmenusActions.SetModalNuevo())
    this.dialogService.open(FormModalSubmenuComponent,'md');

 }

 handleSubmenuMenu(id:string, nombre:string){
    this.store.dispatch(MenusActions.irASubmenuMenu({id}));
    this.store.dispatch(SubmenusActions.CargarListadoDeSubmenus({id,titulo:`Listado de Submenus de ${this.capitalizarPalabras(nombre)}`, page:1, pageSize:10}))
 }


 handleRegresarAMenus(){
  let page=1;
  let pageSize=10;
  this.state$.subscribe(({menu})=>{
    page=menu.source.page;
    pageSize=menu.source.pageSize
  })
  this.store.dispatch(MenusActions.RegresarAMenus({page,pageSize}));
  this.store.dispatch(SubmenusActions.limpiarItemsTabla())
 }

}
