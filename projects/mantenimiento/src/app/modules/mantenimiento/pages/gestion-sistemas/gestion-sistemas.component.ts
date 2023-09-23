import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService, DialogService } from 'ngx-sigape';
import { take } from 'rxjs';
import * as SistemasActions from '../../store/sistema/sistema.action'
import { filter, map } from 'rxjs/operators';
import { IPerfiles, ISistema } from '@sac/core';
import { FormModalSistemaComponent } from '../../components/form-modal-sistema/form-modal-sistema.component';
@Component({
  selector: 'app-gestion-sistemas',
  templateUrl: './gestion-sistemas.component.html',
  styleUrls: ['./gestion-sistemas.component.scss']
})
export class GestionSistemasComponent implements OnInit{
  private store= inject(Store);
  private alertService= inject(AlertService);
  private dialogService= inject(DialogService);
  state$ =  this.store.select('mantenimiento');
  stateSession$= this.store.select('session');
  sistemaId:string="";

  ngOnInit(): void {
    this.store.dispatch(SistemasActions.CargarListadoDeSistemas({page:1, pageSize:10}));
    this.store.select('globalConfig').subscribe(({guidSistema})=>{
      this.sistemaId=guidSistema
    })


    const menu = window.location.pathname.substring(1).toUpperCase();
    this.store.dispatch(SistemasActions.CargarForm({currentForm:'sistema'}))
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
                    if(nombre==="GESTION DE SISTEMAS"){
                      const opcionesArray = opciones?.filter(({ nombre, esEliminado }) => nombre !== "NUEVO" && esEliminado !== true)
                                            .map(({ nombre, icono, esEmergente }) => ({
                                              action: nombre,
                                              icon: icono.toLowerCase(),
                                              color: "primary",
                                              tooltip: this.capitalizarPalabras(nombre.toLowerCase()),
                                            }));

                      const opcionesCurrent= opciones?.filter(({esEliminado})=> esEliminado !==true);

                      this.store.dispatch(SistemasActions.CargarFormSistemas({ opciones: opcionesCurrent! }));
                      this.store.dispatch(SistemasActions.CargarDataGridSistemas({
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
        this.store.dispatch(SistemasActions.EstadoInicialModal());
        this.store.dispatch(SistemasActions.CargarListadoDeSistemas({page:e.page, pageSize:e.pageSize}))
      }else{
        this.store.dispatch(SistemasActions.BuscarSistema({nombre:sistema.busqueda.nombre, icono:sistema.busqueda.icono, url:sistema.busqueda.url,puerto:sistema.busqueda.puerto,page:e.page, pageSize:e.pageSize}))
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
    this.store.dispatch(SistemasActions.SetModalReadOnly({id}));
    this.dialogService.open(FormModalSistemaComponent,'md')
  }

  openModalEditar(id:string){
    this.store.dispatch(SistemasActions.SetModalEditar({id}));
    this.dialogService.open(FormModalSistemaComponent,'md')
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
         this.store.dispatch(SistemasActions.EliminarSistema({id,page,pageSize}));

      }
    });
  }


}
