import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService, DialogService } from 'ngx-sigape';
import { take } from 'rxjs';

@Component({
  selector: 'app-gestion-sistemas',
  templateUrl: './gestion-sistemas.component.html',
  styleUrls: ['./gestion-sistemas.component.scss']
})
export class GestionSistemasComponent {
  private store= inject(Store);
  private alertService= inject(AlertService);
  private dialogService= inject(DialogService);
  state$ =  this.store.select('mantenimiento');
  stateSession$= this.store.select('session');
  sistemaId:string="";

  handleLoadData = (e:any) => {
    this.state$.pipe(take(1)).subscribe(({opcion})=>{
      if(!opcion.busqueda.esBusqueda){

      }else{

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
    // this.store.dispatch(opcionActions.SetModalReadOnly({id}));
    // this.dialogService.open(AgregarOpcionComponent,'md')
  }

  openModalEditar(id:string){
    // this.store.dispatch(opcionActions.SetModalEditar({id}));
    // this.dialogService.open(AgregarOpcionComponent,'md')
  }

  async handleDeleteOpcion(id:string){
    // let page:number;
    // let pageSize:number;
    // this.store.select('mantenimiento').subscribe(({opcion})=>{
    //   page=opcion.source.page;
    //   pageSize=opcion.source.pageSize
    // })
    // this.alertService.open('¿Está seguro de eliminar el registro?', undefined, { confirm: true }).then((confirm) => {
    //   if (confirm) {
    //      this.store.dispatch(opcionActions.EliminarOpcion({id,page,pageSize}));

    //   }
    // });
  }


}
