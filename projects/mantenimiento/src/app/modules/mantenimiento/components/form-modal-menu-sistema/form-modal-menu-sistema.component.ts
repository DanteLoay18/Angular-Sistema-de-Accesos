import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ComboList, FormModel, FormType, IComboList, ISubmitOptions, Validators } from 'ngx-sigape';
import { IMenu } from '../../interfaces/menu.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-form-modal-menu-sistema',
  templateUrl: './form-modal-menu-sistema.component.html',
  styleUrls: ['./form-modal-menu-sistema.component.scss']
})
export class FormModalMenuSistemaComponent {
  private dialogRef = inject(MatDialogRef<FormModalMenuSistemaComponent>);
  private store= inject(Store);
  validators:any;
  state$= this.store.select('mantenimiento');
  form!: FormModel<IMenu>;

  ngOnInit(): void {
    this.state$.subscribe(({menu})=>{
      this.buildForm(menu.modal.form,menu.modal.type );
    })
  }
  listaEsEmergente: IComboList = new ComboList([
    { label: "SI", value: true },
    { label: "NO", value: false }
  ]);

  private buildForm(formMenuSistema:IMenu, formType:FormType) {
    this.buildValidations();
    this.form = new FormModel<any>(
      formType,
      formMenuSistema,
      this.validators,
      {
        onSave: this.onSave
      }
    )
  }


  buildValidations = () => {
    this.validators = {
      sistema: [Validators.required]
    };
  }
  onSave(formValue: any, options: ISubmitOptions): Observable<any> {
    console.log(formValue)
    return of()
  }

  handleSubmit(){
    console.log('Holaaa',this.form.model['sistema'])
    this.form.submit()
  }

  handleInputChange(e:any){

  }

  handleClickButton(e:any){

  }

  handleLoadData(e:any){

  }

  handleClose = () => {
    this.dialogRef.close();
  };
}
