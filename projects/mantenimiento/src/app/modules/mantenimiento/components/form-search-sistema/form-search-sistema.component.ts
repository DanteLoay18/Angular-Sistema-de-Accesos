import { CargarModalOpcion } from './../../store/opciones/opciones.actions';
import { Component,OnInit,inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogService, FormModel, FormType } from 'ngx-sigape';
import { ISistema } from '../../interfaces/sistema.interface';
import * as SistemaActions from '../../store/sistema/sistema.action'
import { FormModalSistemaComponent } from '../form-modal-sistema/form-modal-sistema.component';
@Component({
  selector: 'app-form-search-sistema',
  templateUrl: './form-search-sistema.component.html',
  styleUrls: ['./form-search-sistema.component.scss']
})
export class FormSearchSistemaComponent implements OnInit{
  private dialogService = inject(DialogService);
  private store = inject(Store);
  form!: FormModel<ISistema>;
  state$= this.store.select('mantenimiento');
  formOpcion:ISistema={
    nombre:'',
    icono:'',
    url:'',
    puerto:''
  }
  tieneNuevoOpcion:boolean=false;

  ngOnInit(): void {
   this.buildForm();
   this.state$.subscribe(({sistema})=>{
     sistema.current.opciones.map(({nombre, icono, esEmergente, esEliminado}:any)=>{
        if(nombre==="NUEVO" && esEliminado===false){
          this.tieneNuevoOpcion=true;
        }
      })
   })
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



  handleSearch = (formValue:any) => {

  };

  handleClear = () => {
    this.form.model['nombre'].setValue('');
    this.form.model['icono'].setValue('');
    this.form.model['url'].setValue('');
    this.form.model['puerto'].setValue('');
  };

  handleClickNew = () => {
    this.store.dispatch(SistemaActions.EstadoInicialModal());
    this.store.dispatch(SistemaActions.SetModalNuevo())
    this.dialogService.open(FormModalSistemaComponent,'md');
  };

  handleInputChange({ value }: any, model:string) {
    const validationRules:any = {
      nombre: /^[A-Za-z\s]+$/,
      icono: /^[A-Za-z_]+$/,
      url: /^[A-Za-z]+$/,
      puerto: /^[0-9]+$/,
    };

    if (validationRules.hasOwnProperty(model)) {
      const regex = validationRules[model];
      if (regex.test(value)) {
        if (model === 'nombre' || model === 'icono' || model === 'url') {
          this.form.model[model].setValue(value.toUpperCase());
        } else {
          this.form.model[model].setValue(value);
        }
      } else {
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }



  }
  handleSubmit(){
    let pageSize:number=0;
    this.state$.subscribe(({sistema})=>{
      pageSize=sistema.source.pageSize;
    })
    if(this.form.submit()){
      if(this.form.model['nombre'].value==="" && this.form.model['icono'].value==="" && this.form.model['puerto'].value==="" && this.form.model['url'].value===""){
        this.store.dispatch(SistemaActions.CargarListadoDeSistemas({page:1, pageSize}))
      }else{
        this.store.dispatch(SistemaActions.BuscarSistema({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, url:this.form.model['url'].value, puerto:this.form.model['puerto'].value,page:1, pageSize:pageSize}))
      }


    }
  }
}
