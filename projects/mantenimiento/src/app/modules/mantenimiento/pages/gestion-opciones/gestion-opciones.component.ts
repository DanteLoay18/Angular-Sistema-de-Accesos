import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService, DialogService, IDataGridElement } from 'ngx-sigape';
import * as opcionActions from '../../../mantenimiento/store/opciones/opciones.actions'
import { AgregarOpcionComponent } from '../../components/agregar-opcion/agregar-opcion.component';
import { filter, map, take } from 'rxjs';
import { IPerfiles, ISistema } from '@sac/core';
@Component({
  selector: 'app-gestion-opciones',
  templateUrl: './gestion-opciones.component.html',
  styleUrls: ['./gestion-opciones.component.scss']
})
export class GestionOpcionesComponent {

  gridElement!: IDataGridElement<any>;
  private store= inject(Store);
  private alertService= inject(AlertService);
  state$ =  this.store.select('mantenimiento');
  stateSession$= this.store.select('session');
  sistemaId:string=""
  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.store.dispatch(opcionActions.CargarListadoDeOpciones({page:1, pageSize:10}));
    this.store.select('globalConfig').subscribe(({guidSistema})=>{
      this.sistemaId=guidSistema
    })


    const menu = window.location.pathname.substring(1).toUpperCase();
    this.store.dispatch(opcionActions.CargarForm({currentForm:'opcion'}))
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
                    if(nombre==="GESTION DE OPCIONES"){
                      const opcionesArray = opciones?.filter(({ nombre, esEliminado }) => nombre !== "NUEVO" && esEliminado !== true)
                                            .map(({ nombre, icono, esEmergente }) => ({
                                              action: nombre,
                                              icon: icono.toLowerCase(),
                                              color: "primary",
                                              tooltip: this.capitalizarPalabras(nombre.toLowerCase()),
                                            }));

                      this.store.dispatch(opcionActions.CargarFormOpciones({ opciones: opcionesArray! }));
                      this.store.dispatch(opcionActions.CargarDataGridOpciones({
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

  handleLoadData = (e:any) => {
    this.state$.pipe(take(1)).subscribe(({opcion})=>{
      if(!opcion.busqueda.esBusqueda){
        this.store.dispatch(opcionActions.EstadoInicialModal());
        this.store.dispatch(opcionActions.CargarListadoDeOpciones({page:e.page, pageSize:e.pageSize}))
      }else{
        this.store.dispatch(opcionActions.BuscarOpcion({nombre:opcion.busqueda.nombre, icono:opcion.busqueda.icono, esEmergente:opcion.busqueda.esEmergente,page:e.page, pageSize:e.pageSize}))
      }
    })



  }

  capitalizarPalabras(texto: string): string {
    return texto.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  handleClick = () => {
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
    this.store.dispatch(opcionActions.SetModalReadOnly({id}));
    this.dialogService.open(AgregarOpcionComponent,'md')
  }

  openModalEditar(id:string){
    this.store.dispatch(opcionActions.SetModalEditar({id}));
    this.dialogService.open(AgregarOpcionComponent,'md')
  }

  async handleDeleteOpcion(id:string){
    let page:number;
    let pageSize:number;
    this.store.select('mantenimiento').subscribe(({opcion})=>{
      page=opcion.source.page;
      pageSize=opcion.source.pageSize
    })
    this.alertService.open('¿Está seguro de eliminar el registro?', undefined, { confirm: true }).then((confirm) => {
      if (confirm) {
         this.store.dispatch(opcionActions.EliminarOpcion({id,page,pageSize}));

      }
    });
  }
}
