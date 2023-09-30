import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IMenu } from '@sac/core';
import { FormModel, FormType, ISubmitOptions, Validators } from 'ngx-sigape';
import { Observable, of } from 'rxjs';
import * as SubmenuActions from '../../store/submenu/submenu.actions'

@Component({
  selector: 'app-form-modal-submenu',
  templateUrl: './form-modal-submenu.component.html',
  styleUrls: ['./form-modal-submenu.component.scss']
})
export class FormModalSubmenuComponent {
  private dialogRef = inject(MatDialogRef<FormModalSubmenuComponent>);
  private store= inject(Store);
  form!: FormModel<IMenu>;
  validators:any;
  state$= this.store.select('mantenimiento');

  consultar= FormType.CONSULTAR;


  ngOnInit(): void {
    this.state$.subscribe(({submenu})=>{
      this.buildForm(submenu.modal.form,submenu.modal.type );
    })


  }
  handleClose = () => {
    this.dialogRef.close();
  };

  private buildForm(formSistema:IMenu, formType:FormType) {
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
      nombre: [Validators.required, Validators.maxLength(100)]
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
      let id:string="";
      let idMenu:string=""
      this.store.select('mantenimiento').subscribe(({submenu})=>{
        page=submenu.source.page;
        pageSize=submenu.source.pageSize;
        type=submenu.modal.type;
        id=submenu.modal.codigoSubmenu;
        idMenu=submenu.current.idMenu;
      })

      if(type===FormType.REGISTRAR){
        this.store.dispatch(SubmenuActions.AgregarSubmenu({idMenu,nombre:this.form.model['nombre'].value,  page,pageSize}));
        this.dialogRef.close();
      }else if(type===FormType.EDITAR){
        this.store.dispatch(SubmenuActions.EditarSubmenu({id,idMenu,nombre:this.form.model['nombre'].value, page,pageSize}));
        this.dialogRef.close();
      }
    }


  }

  handleInputChange({ value }: any, model:string) {
    const validationRules:any = {
      nombre: /^[A-Za-z\s]+$/,
    };

    // Verifica si el modelo tiene una regla de validación definida
    if (validationRules.hasOwnProperty(model)) {
      const regex = validationRules[model];
      if (regex.test(value)) {
        if (model === 'nombre') {
          this.form.model[model].setValue(value.toUpperCase());
        }
      } else {
        // Si no cumple con la regla de validación, elimina el último carácter
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }
  }
}
