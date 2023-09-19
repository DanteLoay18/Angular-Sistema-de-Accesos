import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { ComboList, DialogService, FormModel, FormType, IComboList } from 'ngx-sigape';
import { AgregarOpcionComponent } from '../agregar-opcion/agregar-opcion.component';

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

  ngOnInit() {
    this.buildForm();

  }

  private buildForm = () => {
    this.form = new FormModel(
      // tipo formulario
      FormType.BUSCAR,
      // default model
      DEFAULT_MODEL,
      // validators
      {},
      // opciones
      {
        // on search se ejecutara cuando el "tipo formulario" sea de tipo FormType.BUSCAR
        onSearch: this.handleSearch
      }
    );
  };



  handleSearch = (formValue:any) => {

  };

  handleClear = () => {

  };

  handleClickNew = () => {
    this.dialogService.open(AgregarOpcionComponent,'lg');
  };




}
