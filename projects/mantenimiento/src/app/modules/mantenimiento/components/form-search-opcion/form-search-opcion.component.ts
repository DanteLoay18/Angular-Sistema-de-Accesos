import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { ComboList, DialogService, FormModel, FormType, IComboList } from 'ngx-sigape';
import { AgregarOpcionComponent } from '../agregar-opcion/agregar-opcion.component';
import { Store } from '@ngrx/store';
import * as opcionActions from '../../store/opciones/opciones.actions'
import { IOpcion } from '../../interfaces/opcion.interface';



@Component({
  selector: 'app-form-search-opcion',
  templateUrl: './form-search-opcion.component.html',
  styleUrls: ['./form-search-opcion.component.scss']
})
export class FormSearchOpcionComponent implements OnInit {



  listaEdades: IComboList = new ComboList([]);
  private dialogService = inject(DialogService);
  private store = inject(Store);
  form!: FormModel<IOpcion>;
  state$= this.store.select('mantenimiento');
  formOpcion:IOpcion={
    nombre:'',
    icono:'',
    esEmergente:null,
    tieneOpciones:false
  }

  ngOnInit(): void {
   this.buildForm();
  }

  private buildForm() {

    this.form = new FormModel<any>(
      FormType.BUSCAR,
      this.formOpcion,
      {},
      {
        onSearch: this.handleSearch
      }
    );
  };

  listaEsEmergente: IComboList = new ComboList([
    { label: "SI", value: true },
    { label: "NO", value: false }
  ]);


  handleSearch = (formValue:any) => {
    console.log(formValue)
  };

  handleClear = () => {
    this.form.model['nombre'].setValue('');
    this.form.model['icono'].setValue('');
    this.form.model['esEmergente'].setValue('');
  };

  handleClickNew = () => {
    this.store.dispatch(opcionActions.EstadoInicialModal());
    this.store.dispatch(opcionActions.CargarModalOpcion({tipoFormulario:FormType.REGISTRAR, title:'Agregar Opcion'}))
    this.dialogService.open(AgregarOpcionComponent,'md');
  };

  handleInputChange({ value }: any, model:string) {
    if(model==="nombre"){
      if (/^[A-Za-z]+$/.test(value)) {
        // Si el valor es válido, asigna el valor en mayúsculas
        this.form.model[model].setValue(value.toUpperCase());
      } else {
        // Si el valor no es válido, asigna solo la parte válida del valor
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }else if(model==='icono'){
      if (/^[A-Za-z_]+$/.test(value)) {
        // Si el valor es válido, asigna el valor en mayúsculas
        this.form.model[model].setValue(value.toUpperCase());
      } else {
        // Si el valor no es válido, asigna solo la parte válida del valor
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }



  }


}
