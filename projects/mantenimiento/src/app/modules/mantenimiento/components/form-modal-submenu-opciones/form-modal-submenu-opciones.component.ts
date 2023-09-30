import { Component, inject } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AlertService, FormModel, FormType, ISubmitOptions, Validators } from 'ngx-sigape';
import { IMenu } from '../../interfaces/menu.interface';
import * as SubmenuActions from '../../store/submenu/submenu.actions'

@Component({
  selector: 'app-form-modal-submenu-opciones',
  templateUrl: './form-modal-submenu-opciones.component.html',
  styleUrls: ['./form-modal-submenu-opciones.component.scss']
})
export class FormModalSubmenuOpcionesComponent {
  private dialogRef = inject(MatDialogRef<FormModalSubmenuOpcionesComponent>);
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
      ).subscribe(({submenu})=>{

          this.store.dispatch(SubmenuActions.agregarOpcionesSubmenu({id:submenu.modalSistema.idMenu, idOpcion:this.form.model['sistema'].value}))


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

  handleDelete(idOpcion:string){

    this.alertService.open('¿Está seguro de eliminar la opcion del submenu?', undefined, { confirm: true }).then((confirm) => {
      if (confirm) {
        this.state$.pipe(
          take(1)
        ).subscribe(({submenu})=>{
          this.store.dispatch(SubmenuActions.deleteOpcionesSubmenu({id:submenu.modalExtra.idMenu, idOpcion}))
        })

      }
    });
  }
}
