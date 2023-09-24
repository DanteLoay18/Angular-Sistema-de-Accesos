import { Component, OnInit, inject } from '@angular/core';
import { FormModel, FormType, ISubmitOptions, Validators } from 'ngx-sigape';
import { IOpcion } from '../../interfaces/opcion.interface';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ISistema } from '../../interfaces/sistema.interface';
import * as SistemasActions from '../../store/sistema/sistema.action'
@Component({
  selector: 'app-form-modal-sistema',
  templateUrl: './form-modal-sistema.component.html',
  styleUrls: ['./form-modal-sistema.component.scss']
})
export class FormModalSistemaComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<FormModalSistemaComponent>);
  private store= inject(Store);
  form!: FormModel<IOpcion>;
  validators:any;
  state$= this.store.select('mantenimiento');

  consultar= FormType.CONSULTAR;


  ngOnInit(): void {
    this.state$.subscribe(({sistema})=>{
      this.buildForm(sistema.modal.form,sistema.modal.type );
    })


  }
  handleClose = () => {
    this.dialogRef.close();
  };

  private buildForm(formSistema:ISistema, formType:FormType) {
    this.buildValidations();
    this.form = new FormModel<any>(
      formType,
      formSistema,
      this.validators,
      {
        onSave: this.onSave,
        onUpdate: this.handleUpdate
      }
    )
  }

  buildValidations = () => {
    this.validators = {
      nombre: [Validators.required, Validators.maxLength(100)],
      icono: [Validators.required, Validators.maxLength(100)],
      url: [Validators.required],
      puerto : [Validators.required],
      imagen: [Validators.required]
    };
  }

  onSave(formValue: any, options: ISubmitOptions): Observable<any> {
    return of()
  }
  handleUpdate(formValue: any, options: ISubmitOptions): Observable<any> {
    return of()
  }

  submit(){
    if(this.form.submit()){
      let page:number=0;
      let pageSize:number=0;
      let type!:FormType;
      let id:string=""
      this.store.select('mantenimiento').subscribe(({sistema})=>{
        page=sistema.source.page;
        pageSize=sistema.source.pageSize;
        type=sistema.modal.type
        id=sistema.modal.codigoOpcion
      })

      if(type===FormType.REGISTRAR){
        this.store.dispatch(SistemasActions.AgregarSistema({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, url:this.form.model['url'].value, puerto:this.form.model['puerto'].value, imagen:this.form.model['imagen'].value, page,pageSize}));
        this.dialogRef.close();
      }else if(type===FormType.EDITAR){
        this.store.dispatch(SistemasActions.EditarSistema({id,nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, url:this.form.model['url'].value, puerto:this.form.model['puerto'].value, imagen:this.form.model['imagen'].value, page,pageSize}));
        this.dialogRef.close();
      }
    }


  }

  handleInputChange({ value }: any, model:string) {
    const validationRules:any = {
      nombre: /^[A-Za-z\s]+$/,
      icono: /^[A-Za-z_]+$/,
      url: /^[A-Za-z_]+$/,
      puerto: /^[0-9]+$/,
      imagen: /^[A-Za-z.]+$/,
    };

    // Verifica si el modelo tiene una regla de validación definida
    if (validationRules.hasOwnProperty(model)) {
      const regex = validationRules[model];
      if (regex.test(value)) {
        // Si el valor cumple con la regla de validación, asigna el valor transformado
        if (model === 'nombre' || model === 'icono' || model === 'url' || model === 'imagen') {
          this.form.model[model].setValue(value.toUpperCase());
        } else {
          this.form.model[model].setValue(value);
        }
      } else {
        // Si no cumple con la regla de validación, elimina el último carácter
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }
  }

}
