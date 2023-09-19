import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, IDataGridElement } from 'ngx-sigape';
import * as opcionActions from '../../../mantenimiento/store/opciones/opciones.actions'
import { AgregarOpcionComponent } from '../../components/agregar-opcion/agregar-opcion.component';
@Component({
  selector: 'app-gestion-opciones',
  templateUrl: './gestion-opciones.component.html',
  styleUrls: ['./gestion-opciones.component.scss']
})
export class GestionOpcionesComponent {

  gridElement!: IDataGridElement<any>;
  private store= inject(Store);

  state$ =  this.store.select('mantenimiento');

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.state$.subscribe(({opcion})=>{

    })
    this.store.dispatch(opcionActions.CargarListadoDeOpciones({page:1, pageSize:10}));

  }

  handleLoadData = (e:any) => {
    this.store.dispatch(opcionActions.EstadoInicialModal());
    this.store.dispatch(opcionActions.CargarListadoDeOpciones({page:e.page, pageSize:e.pageSize}))


  }


  handleClick = () => {
  }

  handleClickButton = (e: any) => {
		switch (e.action) {

			case 'EDITAR':

      break;
      case 'CONSULTAR':
        this.openModalConsultar(e.item._id)
      break;
      case 'ELIMINAR':

      break;
      default:
        break;
		}
	};

  openModalConsultar(id:string){
    this.store.dispatch(opcionActions.SetModalReadOnly({id}));
    this.dialogService.open(AgregarOpcionComponent,'lg')
  }
}
