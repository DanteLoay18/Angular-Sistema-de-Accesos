import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService, DialogService, IDataGridElement } from 'ngx-sigape';
import * as opcionActions from '../../../mantenimiento/store/opciones/opciones.actions'
import { AgregarOpcionComponent } from '../../components/agregar-opcion/agregar-opcion.component';
import { take } from 'rxjs';
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

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.store.dispatch(opcionActions.CargarListadoDeOpciones({page:1, pageSize:10}));

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
