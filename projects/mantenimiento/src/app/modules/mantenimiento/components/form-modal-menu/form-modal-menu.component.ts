import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IMenu } from '@sac/core';
import { FormModel, FormType, ISubmitOptions, Validators } from 'ngx-sigape';
import { Observable, of } from 'rxjs';
import * as MenusActions from '../../store/menu/menu.actions'
@Component({
  selector: 'app-form-modal-menu',
  templateUrl: './form-modal-menu.component.html',
  styleUrls: ['./form-modal-menu.component.scss']
})
export class FormModalMenuComponent {
  private dialogRef = inject(MatDialogRef<FormModalMenuComponent>);
  private store= inject(Store);
  form!: FormModel<IMenu>;
  validators:any;
  state$= this.store.select('mantenimiento');

  consultar= FormType.CONSULTAR;


  ngOnInit(): void {
    this.state$.subscribe(({menu})=>{
      this.buildForm(menu.modal.form,menu.modal.type );
    })


  }
  handleClose = () => {
    this.dialogRef.close();
  };

  private buildForm(formMenu:IMenu, formType:FormType) {
    this.buildValidations();
    this.form = new FormModel<any>(
      formType,
      formMenu,
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
      this.store.select('mantenimiento').subscribe(({menu})=>{
        page=menu.source.page;
        pageSize=menu.source.pageSize;
        type=menu.modal.type
        id=menu.modal.codigoOpcion
      })

      if(type===FormType.REGISTRAR){
        this.store.dispatch(MenusActions.AgregarMenu({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, url:this.form.model['url'].value, esSubmenu:false,  page,pageSize}));
        this.dialogRef.close();
      }else if(type===FormType.EDITAR){
        this.store.dispatch(MenusActions.EditarMenu({id,nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, url:this.form.model['url'].value, page,pageSize}));
        this.dialogRef.close();
      }
    }


  }

  handleInputChange({ value }: any, model:string) {
    const validationRules:any = {
      nombre: /^[A-Za-z\s]+$/,
      icono: /^[A-Za-z_]+$/,
      url: /^[A-Za-z]+$/,
      puerto: /^[0-9]+$/,
      imagen: /^[A-Za-z.]+$/,
    };

    // Verifica si el modelo tiene una regla de validación definida
    if (validationRules.hasOwnProperty(model)) {
      const regex = validationRules[model];
      if (regex.test(value)) {
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
