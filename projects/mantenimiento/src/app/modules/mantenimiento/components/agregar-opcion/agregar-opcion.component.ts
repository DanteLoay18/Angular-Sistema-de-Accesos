import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOpcion } from '../../interfaces/opcion.interface';
import { ComboList, FormModel, FormType, IComboList, ISubmitOptions, Validators } from 'ngx-sigape';
import { APP_FORM_VALIDATOR } from '@sac/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromOpcion from '../../store/opciones/opciones.actions';


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
        onUpdate: this.handleUpdate
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
  handleUpdate(formValue: any, options: ISubmitOptions): Observable<any> {
    return of()
  }

  submit(){
    var page:number=0;
    var pageSize:number=0;
    var type!:FormType;
    var id:string=""
    this.store.select('mantenimiento').subscribe(({opcion})=>{
      page=opcion.source.page;
      pageSize=opcion.source.pageSize;
      type=opcion.modalOpcion.type
      id=opcion.modalOpcion.codigoOpcion
    })
    this.form.submit();

    if(type===FormType.REGISTRAR){
      this.store.dispatch(fromOpcion.AgregarOpcion({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, esEmergente:this.form.model['esEmergente'].value, tieneOpciones:false, page,pageSize}));
       this.dialogRef.close();
    }else if(type===FormType.EDITAR){
      this.store.dispatch(fromOpcion.EditarOpcion({id,nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, esEmergente:this.form.model['esEmergente'].value, tieneOpciones:false, page,pageSize}));
      this.dialogRef.close();
    }

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
