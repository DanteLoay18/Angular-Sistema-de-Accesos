import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService, DialogService } from 'ngx-sigape';
import * as MenusActions from '../../store/menu/menu.actions'
import { FormModalMenuComponent } from '../../components/form-modal-menu/form-modal-menu.component';
import { take, filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMenu, IPerfiles, ISistema } from '@sac/core';
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
    this.store.dispatch(MenusActions.CargarForm({currentForm:'sistema'}))
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
                      const opcionesArray = opciones?.filter(({ nombre, esEliminado }) => nombre !== "NUEVO" && esEliminado !== true)
                                            .map(({ nombre, icono, esEmergente }) => ({
                                              action: nombre,
                                              icon: icono.toLowerCase(),
                                              color: "primary",
                                              tooltip: this.capitalizarPalabras(nombre.toLowerCase()),
                                            }));

                      const opcionesCurrent= opciones?.filter(({esEliminado})=> esEliminado !==true);

                      this.store.dispatch(MenusActions.CargarFormMenus({ opciones: opcionesCurrent! }));
                      this.store.dispatch(MenusActions.CargarDataGridMenus({
                        columna: {
                          label: 'Acciones',
                          field: 'buttons',
                          buttons: opcionesArray,
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

  handleLoadData = (e:any) => {
    this.state$.pipe(take(1)).subscribe(({sistema})=>{
      if(!sistema.busqueda.esBusqueda){
        this.store.dispatch(MenusActions.EstadoInicialModal());
        this.store.dispatch(MenusActions.CargarListadoDeMenus({page:e.page, pageSize:e.pageSize}))
      }else{
        this.store.dispatch(MenusActions.BuscarMenu({nombre:sistema.busqueda.nombre, icono:sistema.busqueda.icono, url:sistema.busqueda.url,page:e.page, pageSize:e.pageSize}))
      }
    })



  }

  handleClickButton = (e: any) => {
		switch (e.action) {

			case 'EDITAR':
        this.openModalEditar(e.item._id);
      break;
      case 'CONSULTAR':
        this.openModalConsultar(e.item._id);
      break;
      case 'ELIMINAR':
        this.handleDeleteOpcion(e.item._id);
      break;
      default:
        break;
		}
	};

  openModalConsultar(id:string){
    this.store.dispatch(MenusActions.SetModalReadOnly({id}));
    this.dialogService.open(FormModalMenuComponent,'md')
  }

  openModalEditar(id:string){
    this.store.dispatch(MenusActions.SetModalEditar({id}));
    this.dialogService.open(FormModalMenuComponent,'md')
  }

  async handleDeleteOpcion(id:string){
    let page:number;
    let pageSize:number;
    this.store.select('mantenimiento').subscribe(({sistema})=>{
      page=sistema.source.page;
      pageSize=sistema.source.pageSize
    })
    this.alertService.open('¿Está seguro de eliminar el registro?', undefined, { confirm: true }).then((confirm) => {
      if (confirm) {
         this.store.dispatch(MenusActions.EliminarMenu({id,page,pageSize}));

      }
    });
  }

}
