import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOpcion } from '../../interfaces/opcion.interface';
import { ComboList, FormModel, FormType, IComboList, ISubmitOptions, Validators } from 'ngx-sigape';
import { APP_FORM_VALIDATOR } from '@sac/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromOpcion from '../../store/opciones/opciones.actions';


const MESSAGES = {
  CONFIRM_SAVE: '¿Está seguro de GUARDAR los datos de la opcion?',
  CONFIRM_UPDATE: '¿Está seguro de ACTUALIZAR los datos de la opcion?',
  CONFIRM_SAVE_SUCCES: 'El registro se guardó correctamente',
  CONFIRM_UPDATE_SUCCES: 'El registro se actualizó correctamente'
};

@Component({
  selector: 'app-agregar-opcion',
  templateUrl: './agregar-opcion.component.html',
  styleUrls: ['./agregar-opcion.component.scss']
})
export class AgregarOpcionComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<AgregarOpcionComponent>);
  private store= inject(Store);
  form!: FormModel<IOpcion>;
  validators:any;
  state$= this.store.select('mantenimiento');

  listaEsEmergente: IComboList = new ComboList([
    { label: "SI", value: true },
    { label: "NO", value: false }
  ]);

  consultar= FormType.CONSULTAR;


  ngOnInit(): void {
    this.state$.subscribe(({opcion})=>{
      this.buildForm(opcion.modalOpcion.form,opcion.modalOpcion.type );
    })


  }
  handleClose = () => {
    this.dialogRef.close();
  };

  private buildForm(formOpcion:IOpcion, formType:FormType) {
    this.buildValidations();
    this.form = new FormModel<any>(
      formType,
      formOpcion,
      this.validators,
      {
        onSave: this.onSave,
      }
    )
  }

  buildValidations = () => {
    this.validators = {
      nombre: [Validators.required, Validators.maxLength(100)],
      icono: [Validators.required, Validators.maxLength(100)],
      esEmergente: [Validators.required],
    };
  }

  onSave(formValue: any, options: ISubmitOptions): Observable<any> {



    return of()
  }

  submit(){
    this.form.submit();
    this.store.dispatch(fromOpcion.AgregarOpcion({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, esEmergente:this.form.model['esEmergente'].value, tieneOpciones:false}));
    this.dialogRef.close();
  }

  handleInputChange({ value }: any, model:string) {

    this.form.model[model].value = value.toUpperCase();

  }
}

export class Opcion{
  nombre:string='';
  icono:string='';
  esEmergente:boolean | string=false;
  tieneOpciones:boolean | string=false;

  static createOpcion(nombre: string, icono:string, esEmergente:boolean | string){
    const opcion = new Opcion();

    opcion.nombre=nombre;
    opcion.icono=icono;
    opcion.esEmergente=esEmergente;
    opcion.tieneOpciones=false;
    return opcion;
}
}
