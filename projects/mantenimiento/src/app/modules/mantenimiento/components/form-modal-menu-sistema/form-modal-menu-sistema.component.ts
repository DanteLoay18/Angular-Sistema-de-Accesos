import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AlertService, ComboList, FormModel, FormType, IComboList, ISubmitOptions, Validators } from 'ngx-sigape';
import { IMenu } from '../../interfaces/menu.interface';
import { Observable, of, take } from 'rxjs';
import * as MenusActions from '../../store/menu/menu.actions'
@Component({
  selector: 'app-form-modal-menu-sistema',
  templateUrl: './form-modal-menu-sistema.component.html',
  styleUrls: ['./form-modal-menu-sistema.component.scss']
})
export class FormModalMenuSistemaComponent {
  private dialogRef = inject(MatDialogRef<FormModalMenuSistemaComponent>);
  private store= inject(Store);
  private alertService= inject(AlertService);
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
    return of()
  }

  handleSubmit(){
    if(this.form.submit()){

      this.state$.pipe(
        take(1)
      ).subscribe(({menu})=>{
        if(menu.modalSistema.source.items.length>0){
          this.alertService.open('No se puede agregar un sistema, ya existe uno, primero eliminelo', undefined, { icon: 'error' });
        }else{
          this.store.dispatch(MenusActions.agregarSistemaMenu({id:menu.modalSistema.idMenu, idSistema:this.form.model['sistema'].value}))
        }

      })
    }
  }

  handleInputChange(e:any){

  }

  handleClickButton(e:any){
    switch(e.action){
      case 'ELIMINAR':
        this.handleDelete(e.item._id);
        break;
      default:
        break;
    }

  }

  handleLoadData(e:any){

  }

  handleClose = () => {
    this.dialogRef.close();
  };

  handleDelete(idSistema:string){

    this.alertService.open('¿Está seguro de eliminar el sistema del menu?', undefined, { confirm: true }).then((confirm) => {
      if (confirm) {
        this.state$.pipe(
          take(1)
        ).subscribe(({menu})=>{
          this.store.dispatch(MenusActions.deleteSistemaMenu({id:menu.modalSistema.idMenu, idSistema}))
        })

      }
    });
  }
}
