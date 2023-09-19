import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOpcion } from '../../interfaces/opcion.interface';
import { ComboList, FormModel, FormType, IComboList, ISubmitOptions, Validators } from 'ngx-sigape';
import { APP_FORM_VALIDATOR } from '@sac/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromOpcion from '../../store/opciones/opciones.actions'
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

  listaEsEmergente: IComboList = new ComboList([
    { label: "SI", value: true },
    { label: "NO", value: false }
  ]);

  ngOnInit(): void {
    this.buildForm();
  }
  handleClose = () => {
    this.dialogRef.close();
  };

  private buildForm() {
    this.buildValidations();
    this.form = new FormModel<any>(
      FormType.REGISTRAR,
      new Opcion(),
      this.validators,
      {
        onSave: this.onSave,
      }
    )
  }

  buildValidations = () => {
    this.validators = {
      nombre: [Validators.required, Validators.maxLength(100)],
      icono: [Validators.required, Validators.maxLength(100), Validators.pattern(new RegExp(APP_FORM_VALIDATOR.SAC_RE_LETRAS))],
      esEmergente: [Validators.required],
      // tieneOpciones: [],
    };
  }

  onSave(formValue: any, options: ISubmitOptions): Observable<any> {


    return of()
  }

  submit(){
    this.store.dispatch(fromOpcion.AgregarOpcion({nombre:'ELIMINAR2', icono:'DELETE2', esEmergente:true, tieneOpciones:false}));
  }

  handleInputChange({ value }: any) {

    this.form.model['nombre'].value = value.toUpperCase();

  }
}

export class Opcion{
  nombre:string='';
  icono:string='';
  esEmergente:boolean=false;
  tieneOpciones:boolean=false;
}
