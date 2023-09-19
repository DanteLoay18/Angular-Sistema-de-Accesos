import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { ComboList, DialogService, FormModel, FormType, IComboList } from 'ngx-sigape';
import { AgregarOpcionComponent } from '../agregar-opcion/agregar-opcion.component';
import { Store } from '@ngrx/store';
import * as opcionActions from '../../store/opciones/opciones.actions'
interface ISearchModel {
  nombre: string;
  edad: number;
}

const DEFAULT_MODEL: ISearchModel = {
  nombre: '',
  edad: 0
};

@Component({
  selector: 'app-form-search-opcion',
  templateUrl: './form-search-opcion.component.html',
  styleUrls: ['./form-search-opcion.component.scss']
})
export class FormSearchOpcionComponent implements OnInit {


  form!: FormModel<ISearchModel>;

  listaEdades: IComboList = new ComboList([]);
  private dialogService = inject(DialogService);
  private store = inject(Store);

  ngOnInit() {
    this.buildForm();

  }

  private buildForm = () => {
    this.form = new FormModel(
      FormType.BUSCAR,
      DEFAULT_MODEL,
      {},
      {
        onSearch: this.handleSearch
      }
    );
  };



  handleSearch = (formValue:any) => {

  };

  handleClear = () => {

  };

  handleClickNew = () => {
    this.store.dispatch(opcionActions.EstadoInicialModal());
    this.store.dispatch(opcionActions.CargarModalOpcion({tipoFormulario:FormType.REGISTRAR, title:'Agregar Opcion'}))
    this.dialogService.open(AgregarOpcionComponent,'md');
  };




}
