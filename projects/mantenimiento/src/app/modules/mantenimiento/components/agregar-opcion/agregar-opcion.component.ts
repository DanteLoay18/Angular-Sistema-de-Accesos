import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IOpcion } from '../../interfaces/opcion.interface';
import { ComboList, FormModel, FormType, IComboList, ISubmitOptions, Validators } from 'ngx-sigape';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromOpcion from '../../store/opciones/opciones.actions';
import { APP_FORM_VALIDATOR } from '@sac/core';


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
    if(this.form.submit()){
      let page:number=0;
      let pageSize:number=0;
      let type!:FormType;
      let id:string=""
      this.store.select('mantenimiento').subscribe(({opcion})=>{
        page=opcion.source.page;
        pageSize=opcion.source.pageSize;
        type=opcion.modalOpcion.type
        id=opcion.modalOpcion.codigoOpcion
      })

      if(type===FormType.REGISTRAR){
        this.store.dispatch(fromOpcion.AgregarOpcion({nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, esEmergente:this.form.model['esEmergente'].value, tieneOpciones:false, page,pageSize}));
        this.dialogRef.close();
      }else if(type===FormType.EDITAR){
        this.store.dispatch(fromOpcion.EditarOpcion({id,nombre:this.form.model['nombre'].value, icono:this.form.model['icono'].value, esEmergente:this.form.model['esEmergente'].value, tieneOpciones:false, page,pageSize}));
        this.dialogRef.close();
      }
    }


  }

  handleInputChange({ value }: any, model:string) {
    if(model==="nombre"){
      if (/^[A-Za-z]+$/.test(value)) {
        // Si el valor es válido, asigna el valor en mayúsculas
        this.form.model[model].setValue(value.toUpperCase());
      } else {
        // Si el valor no es válido, asigna solo la parte válida del valor
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }else if(model==='icono'){
      if (/^[A-Za-z_]+$/.test(value)) {
        // Si el valor es válido, asigna el valor en mayúsculas
        this.form.model[model].setValue(value.toUpperCase());
      } else {
        // Si el valor no es válido, asigna solo la parte válida del valor
        this.form.model[model].setValue(value.slice(0, -1));
      }
    }



  }
}

export class Opcion{
  nombre:string='';
  icono:string='';
  esEmergente:boolean | string | null=null;
  tieneOpciones:boolean | string=false;

  static createOpcion(nombre: string, icono:string, esEmergente:boolean |string | null){
    const opcion = new Opcion();

    opcion.nombre=nombre;
    opcion.icono=icono;
    opcion.esEmergente=esEmergente;
    opcion.tieneOpciones=false;
    return opcion;
}
}
