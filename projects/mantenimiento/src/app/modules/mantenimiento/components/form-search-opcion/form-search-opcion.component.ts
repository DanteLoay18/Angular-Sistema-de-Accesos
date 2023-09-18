import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ComboList, FormModel, FormType, IComboList } from 'ngx-sigape';

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
  @Output() clickNew: EventEmitter<any> = new EventEmitter();

  form!: FormModel<ISearchModel>;

  listaEdades: IComboList = new ComboList([]);


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
    console.log(formValue);
  };

  handleClear = () => {

  };

  handleClickNew = () => {
    console.log('Nuevo')
    this.clickNew.emit();
  };




}
